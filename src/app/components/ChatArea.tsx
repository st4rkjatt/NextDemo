// ✨ Cleaned and improved ChatArea.tsx ✨
import { Menu, MicOff, PhoneOff, Video } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';

import socket from '../utils/helper/socketGlobal';
import {
  acceptFriendRequest,
  friendRequest,
  getConversation,

} from '../utils/helper/allApiCalls';
import {
  AllUserType,
  CallerType,
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

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showStream, setshowStream] = useState<Boolean>(false);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<Peer.Instance | null>(null);
  const [callerSignal, setCallerSignal] = useState<any>(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState<string>('');
  const [callerName, setCallerName] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const partnerVideo = useRef<HTMLVideoElement | null>(null);
  const callAcceptedHandler = useRef<any>(null);
  const me = useChatStore((state) => state.me);

  const { messages, setMessages, addMessage, setFriendRequest, receiveFriendRequest, receiverFriendAccept } = useChatStore();

  // ⛏️ Setup media once
  useEffect(() => {

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
    if (!selectedChatUser || !me) return;
    (async () => {
      const data: MessageData = await getConversation(selectedChatUser._id);
      setMessages(data);

    })();
  }, [selectedChatUser, me]);

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


  useEffect(() => {
    if (me) {
      const userDetails = {
        userId: me?._id,
      };
      socket.emit('registerUser', userDetails);
    }
  }, [me])

  const setupMedia = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(media);
      return media
    } catch (error) {
      console.error('Media error:', error);
    }
  };

  const handleIncomingMessage = (msg: Message) => addMessage(msg);

  const handleIncomingCall = ({ from, signal, fromName }: { from: string; signal: string, fromName: string }) => {
    console.log('Incoming call from: hey', from, signal, fromName);
    setReceivingCall(true);
    setCaller(from);
    setCallerName(fromName)
    setCallerSignal(signal);
  };

  const submitMessageFunc = (msg: string) => {
    if (!me || !selectedChatUser) return;

    const newMsg = { senderId: me._id, receiverId: selectedChatUser._id, message: msg };
    socket.emit('sendMessage', newMsg);
    addMessage(newMsg);
  };

  const sendFriendRequestHandler = async () => {
    if (!me || !selectedChatUser) return;
    const status = await friendRequest({ id: selectedChatUser._id });
    socket.emit('sendFriendRequest', { ...status, to: selectedChatUser._id, friendRequestBy: me._id });
    setFriendRequest(status);
  };

  const acceptFriendRequestHandler = async () => {
    if (!me || !selectedChatUser) return;
    const status = await acceptFriendRequest({ id: selectedChatUser._id });
    socket.emit('acceptFriendRequest', { ...status, to: selectedChatUser._id });
    receiveFriendRequest(status);
  };

  const handleEndCall = () => {
    console.log('{ to: caller }??')
    peer?.destroy();
    setRemoteStream(null);
    setshowStream(false);
    setStream(null);
  }
  const callPeer = async (activeStream: MediaStream | null) => {
    console.log(activeStream, selectedChatUser, me, '???')

    if (!activeStream || !selectedChatUser || !me) return

    if (peer) {
      peer.destroy();
      socket.off('callAccepted', callAcceptedHandler.current);
    }

    const newPeer = new Peer({ initiator: true, trickle: false, stream: activeStream || undefined });

    newPeer.on('signal', (data) => {
      console.log("signal?", data)
      socket.emit('callUser', {
        userToCall: selectedChatUser?._id,
        signalData: data,
        from: me?._id,
        fromUserName: me?.fullName,
      });
    });

    newPeer.on('stream', (incoming) => {
      console.log('stream?', incoming)
      setRemoteStream(incoming)
    });
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
    let activeStream = stream;
    if (!activeStream) {
      activeStream = (await setupMedia()) ?? null; // ensures stream is set and type is MediaStream | null
    }

    // Wait until stream is available in state
    if (activeStream) {
      setshowStream(true);
      callPeer(activeStream);
    }
  };

  const acceptCall = async () => {
    let activeStream = stream;
    if (!activeStream) {
      activeStream = (await setupMedia()) ?? null
    }
    if (peer) peer.destroy();
    setshowStream(true);
    const newPeer = new Peer({ initiator: false, trickle: false, stream: activeStream || undefined });

    newPeer.on('signal', (data) => {
      console.log('accept side signal', data)
      socket.emit('acceptCall', { signal: data, to: caller })
    }
    );
    newPeer.on('stream', (incoming) => {
      console.log('accept side stream', incoming)
      setRemoteStream(incoming)
    });
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
    // setRemoteStream(null);
    setshowStream(false);
    // setStream(null);
    socket.emit('endCall', { to: caller || me?._id });
  };

  const rejectCall = () => {
    socket.emit('rejectCall', { to: caller });
    setReceivingCall(false);
    setshowStream(false);
  };

  const checkAndRequestPermissions = async (): Promise<boolean> => {
    try {
      const permissions = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      console.log('Permissions granted:', permissions);
      permissions.getTracks().forEach((track) => track.stop()); // Stop immediately after check
      return true;
    } catch (error) {
      console.error('Permission denied:', error);
      return false;
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!selectedChatUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Menu className="w-10 h-10 text-gray-400" onClick={onOpenSidebar} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
          <p className="text-gray-600">Choose a conversation from the sidebar to start chatting</p>
        </div>
      </div>
    );
  }
  return (
    <div className="relative flex-1 flex flex-col h-full">
      <ChatHeader selectedChatUser={selectedChatUser} onOpenSidebar={onOpenSidebar} handleCall={handleCall} />
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {messages?.friendStatus === enums.Accepted ? (
          <>
            <div>
              {messages.data?.map((message, i) => (
                <MessageBubble id={i} message={message} chatUserName={selectedChatUser} messagesEndRef={messagesEndRef} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-[60vh]">
            <FriendRequestButton
              friendStatus={messages?.friendStatus}
              friendRequestBy={messages?.friendRequestBy}
              currentUserId={me?._id}
              onSendRequest={sendFriendRequestHandler}
              onAcceptRequest={acceptFriendRequestHandler}
            />
          </div>
        )}
      </div>

      <MessageInput submitMessageFunc={submitMessageFunc} receiverId={selectedChatUser?._id} />

      {/* Remote video full screen */}
      {stream && (
        <div className={`fixed inset-0 z-50 bg-black/80 flex items-center justify-center ${showStream ? 'block' : 'hidden'}`}>
          <div className="relative w-full max-w-5xl h-[90vh] sm:h-[80vh] rounded-xl shadow-2xl overflow-hidden flex flex-col bg-gray-800 text-white">

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
          <IncomingCallModal caller={caller} callerName={callerName} handleAccept={acceptCall} handleReject={rejectCall} />
        </div>
      )}
    </div>
  );
};

export default ChatArea;
