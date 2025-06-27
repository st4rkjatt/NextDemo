// ✨ Cleaned and improved ChatArea.tsx ✨
import { MicOff, PhoneOff, Video } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';

import socket from '../utils/helper/socketGlobal';
import {
  acceptFriendRequest,
  friendRequest,
  getConversation,
  getUserData,
} from '../utils/helper/allApiCalls';
import {
  AllUserType,
  Message,
  MessageData,

} from '../utils/helper/types';
import { useChatStore } from '@/stores/store';
import { enums } from '../utils/helper/enums';
import FriendRequestButton from './friendRequestButton';
import { ChatHeader } from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import IncomingCallModal from './IncomingCallModal';

const ChatArea = ({ selectedChatUser, onOpenSidebar }: { selectedChatUser: AllUserType | null; onOpenSidebar: () => void }) => {
  const [userData, setUserData] = useState<AllUserType | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showStream, setshowStream] = useState<Boolean>(false);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<Peer.Instance | null>(null);
  const [callerSignal, setCallerSignal] = useState<any>(null);
  const [caller, setCaller] = useState('');
  const [receivingCall, setReceivingCall] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const partnerVideo = useRef<HTMLVideoElement | null>(null);
  const callAcceptedHandler = useRef<any>(null);

  const { messages, setMessages, addMessage, setFriendRequest, receiveFriendRequest, receiverFriendAccept } = useChatStore();

  // ⛏️ Setup media once
  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserData();
      setUserData(user);
    };

    fetchUserData();
    setupMedia();

    socket.on('receiveMessage', handleIncomingMessage);
    socket.on('receiveFriendRequest', receiveFriendRequest);
    socket.on('receiveAcceptFriendRequest', receiverFriendAccept);
    socket.on('hey', handleIncomingCall);
    socket.on('callEnded', handleEndCall);

    return () => {
      socket.off('receiveMessage', handleIncomingMessage);
      socket.off('receiveFriendRequest', receiveFriendRequest);
      socket.off('receiveAcceptFriendRequest', receiverFriendAccept);
      socket.off('hey', handleIncomingCall);
      socket.off('callAccepted', callAcceptedHandler.current);
      socket.off('callEnded', handleEndCall);

      if (peer) peer.destroy();
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  useEffect(() => {
    if (!selectedChatUser || !userData) return;
    (async () => {
      const data: MessageData = await getConversation(selectedChatUser._id);
      setMessages(data);
      socket.emit('registerUser', { userId: userData._id });
    })();
  }, [selectedChatUser, userData]);

  useEffect(() => {
    if (stream && userVideo.current) {
      userVideo.current.srcObject = stream;
      userVideo.current.play().catch(console.error);
    }
  }, [stream]);

  useEffect(() => {
    if (remoteStream && partnerVideo.current) {
      partnerVideo.current.srcObject = remoteStream;
      partnerVideo.current.play().catch(console.error);
    }
  }, [remoteStream]);

  const setupMedia = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(media);
    } catch (error) {
      console.error('Media error:', error);
    }
  };

  const handleIncomingMessage = (msg: Message) => addMessage(msg);

  const handleIncomingCall = ({ from, signal }: { from: string; signal: any }) => {
    console.log('Incoming call from: hey', from);
    setReceivingCall(true);
    setCaller(from);
    setCallerSignal(signal);
  };

  const submitMessageFunc = (msg: string) => {
    if (!userData || !selectedChatUser) return;

    const newMsg = { senderId: userData._id, receiverId: selectedChatUser._id, message: msg };
    socket.emit('sendMessage', newMsg);
    addMessage(newMsg);
  };

  const sendFriendRequestHandler = async () => {
    if (!userData || !selectedChatUser) return;
    const status = await friendRequest({ id: selectedChatUser._id });
    socket.emit('sendFriendRequest', { ...status, to: selectedChatUser._id, friendRequestBy: userData._id });
    setFriendRequest(status);
  };

  const acceptFriendRequestHandler = async () => {
    if (!userData || !selectedChatUser) return;
    const status = await acceptFriendRequest({ id: selectedChatUser._id });
    socket.emit('acceptFriendRequest', { ...status, to: selectedChatUser._id });
    receiveFriendRequest(status);
  };

  const handleEndCall = () => {
    console.log('Call ended');
    peer?.destroy();
    setRemoteStream(null);
    setshowStream(false);
    setStream(null);
  }
  const callPeer = () => {
    if (!stream || !selectedChatUser || !userData) return;

    if (peer) {
      peer.destroy();
      socket.off('callAccepted', callAcceptedHandler.current);
    }

    const newPeer = new Peer({ initiator: true, trickle: false, stream });

    newPeer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: selectedChatUser._id,
        signalData: data,
        from: userData._id,
      });
    });

    newPeer.on('stream', (incoming) => setRemoteStream(incoming));
    newPeer.on('error', console.error);
    newPeer.on('close', () => {
      setRemoteStream(null);
      // setCallAccepted(false);
    });

    callAcceptedHandler.current = (signal: any) => {
      newPeer.signal(signal);
    };

    socket.on('callAccepted', callAcceptedHandler.current);
    setPeer(newPeer);
  };

  const handleCall = async () => {
    setshowStream(true);
    await setupMedia();
    callPeer();
  };

  const acceptCall = async () => {
    if (!stream) await setupMedia();
    if (peer) peer.destroy();
    setshowStream(true);
    const newPeer = new Peer({ initiator: false, trickle: false, stream: stream || undefined });

    newPeer.on('signal', (data) => socket.emit('acceptCall', { signal: data, to: caller }));
    newPeer.on('stream', (incoming) => setRemoteStream(incoming));
    newPeer.on('error', console.error);
    newPeer.on('close', () => {
      setRemoteStream(null);
      // setCallAccepted(false);
    });

    newPeer.signal(callerSignal);
    setPeer(newPeer);
    setReceivingCall(false);
  };

  const endCall = () => {
    peer?.destroy();
    setRemoteStream(null);
    setshowStream(false);
    setStream(null);
    socket.emit('endCall', { to: caller });
  };

  const rejectCall = () => {
    socket.emit('rejectCall', { to: caller });
    setReceivingCall(false);
    setshowStream(false);
  };

  console.log(showStream, stream, remoteStream, 'showStream stream remoteStream');
  return (
    <div className="relative flex-1 flex flex-col h-full">
      <ChatHeader selectedChatUser={selectedChatUser} onOpenSidebar={onOpenSidebar} handleCall={handleCall} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {messages?.friendStatus === enums.Accepted ? (
          <>
            <div className="flex justify-center mb-4">
              <div className="rounded py-2 px-4 bg-yellow-100 text-xs">
                Messages and calls are end-to-end encrypted.
              </div>
            </div>
            <div>
              {messages.data?.map((message) => (
                <MessageBubble key={message._id} message={message} chatUserName={selectedChatUser} messagesEndRef={messagesEndRef} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-[60vh]">
            <FriendRequestButton
              friendStatus={messages?.friendStatus}
              friendRequestBy={messages?.friendRequestBy}
              currentUserId={userData?._id}
              onSendRequest={sendFriendRequestHandler}
              onAcceptRequest={acceptFriendRequestHandler}
            />
          </div>
        )}
      </div>

      <MessageInput submitMessageFunc={submitMessageFunc} receiverId={selectedChatUser?._id} />

      {stream && (
        <div className={`fixed inset-0 z-50 bg-black/80 flex items-center justify-center ${showStream ? 'block' : 'hidden'}`}>
          <div className="relative w-full max-w-5xl h-[90vh] sm:h-[80vh] rounded-xl shadow-2xl overflow-hidden flex flex-col bg-gray-800 text-white">

            {/* Remote video full screen */}
            <video
              ref={partnerVideo}
              autoPlay
              playsInline
              className="w-full h-full object-cover transition-opacity duration-300"
              style={{ opacity: remoteStream ? 1 : 0 }}
            />

            {/* Local video small preview */}
            <video
              ref={userVideo}
              autoPlay
              playsInline
              muted
              className="absolute top-0 right-0 sm:bottom-24 sm:right-4 w-28 h-20 sm:w-40 sm:h-28 rounded-lg border-2 border-white object-cover shadow-md"
            />

            {/* Controls */}
            <div className="absolute bottom-4 w-full px-4 flex justify-center gap-4 sm:gap-6">
              <button className="p-3 sm:p-4 cursor-pointer bg-white text-black rounded-full hover:bg-gray-200 transition">
                <Video size={20} />
              </button>
              <button className="p-3 sm:p-4 cursor-pointer bg-white text-black rounded-full hover:bg-gray-200 transition">
                <MicOff size={20} />
              </button>
              <button
                className="p-3 sm:p-4 cursor-pointer bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow-lg"
                onClick={endCall}
              >
                <PhoneOff size={20} />
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Incoming Call Modal */}
      {receivingCall && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <IncomingCallModal handleAccept={acceptCall} handleReject={rejectCall} />
        </div>
      )}
    </div>
  );
};

export default ChatArea;
