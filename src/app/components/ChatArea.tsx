
import { Menu } from 'lucide-react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { AllUserType, Conversation, Message, MessageData, SendFriendRequestType } from '../utils/helper/types';
import { useEffect, useRef, useState } from 'react';
import { useChatStore } from '@/stores/store';
import socket from '../utils/helper/socketGlobal';
import { acceptFriendRequest, friendRequest, getConversation, getUserData } from '../utils/helper/allApiCalls';
import { enums } from '../utils/helper/enums';
import FriendRequestButton from './friendRequestButton';
import { ChatHeader } from './ChatHeader';
import VideoCalling from './VideoCalling';
import Peer from "simple-peer";
import IncomingCallModal from './IncomingCallModal';


const ChatArea = ({ selectedChatUser, onOpenSidebar }: { selectedChatUser: AllUserType | null; onOpenSidebar: () => void }) => {

  const [userData, setUserData] = useState<AllUserType | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const partnerVideo = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [caller, setCaller] = useState("");
  const [isCalling, setIsCalling] = useState(false);
  const [callerSignal, setCallerSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [receivingCall, setReceivingCall] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const { messages, setMessages, addMessage, setFriendRequest, receiveFriendRequest, receiverFriendAccept } = useChatStore();



  useEffect(() => {
    const setupMediaAndUser = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(mediaStream);
        if (userVideo.current) {
          userVideo.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
      const data: AllUserType = await getUserData();
      setUserData(data);
    };

    setupMediaAndUser();

    if (!socket) return;
    socket.on("receiveMessage", handleIncomingMessage);
    socket.on("receiveFriendRequest", handleReceiveFriendRequest);
    socket.on("receiveAcceptFriendRequest", handleReceiveFriendRequestAccept);
    // socket.on("receiveTyping", handleReceivingTyping);

    socket.on("receivingCallFromSend", handleReceingCallFromSend);
    socket.on("callAccepted", handleCallAccepted);
    return () => {
      socket.off("receiveMessage", handleIncomingMessage);
      socket.off("receiveFriendRequest", handleReceiveFriendRequest);
      socket.off("receiveAcceptFriendRequest", handleReceiveFriendRequestAccept);
      // socket.off("receiveTyping", handleReceivingTyping);
      socket.off("receivingCallFromSend", handleReceingCallFromSend);
      socket.off("callAccepted", handleCallAccepted);
    };
  }, [])


  useEffect(() => {
    if (selectedChatUser) {
      if (!userData) return;
      (async () => {
        const data: MessageData = await getConversation(selectedChatUser?._id);
        setMessages(data);
      })();

      const userDetails = {
        userId: userData._id,
      };

      socket.emit('registerUser', userDetails);

    }
  }, [selectedChatUser])




  useEffect(() => {
    const timer = setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // slight delay ensures rendering is done

    return () => clearTimeout(timer);
  }, [messages]);


  const submitMessageFunc = (msg: string) => {
    if (!userData || !selectedChatUser) return;

    const newMessage = {
      senderId: userData._id,
      receiverId: selectedChatUser._id,
      message: msg,
    };

    if (socket.connected) {
      addMessage({ ...newMessage }); // optimistic UI
      socket.emit("sendMessage", newMessage);
    }
  };


  const handleReceiveFriendRequestAccept = (data: SendFriendRequestType) => {
    receiverFriendAccept(data)
  };
  const handleReceiveFriendRequest = (data: SendFriendRequestType) => {
    receiveFriendRequest(data)
  };
  const handleIncomingMessage = (msg: Message) => {
    addMessage(msg);
  };

  const sendFriendRequest = async () => {
    if (userData && selectedChatUser) {
      const status = await friendRequest({ id: selectedChatUser?._id })
      status.to = selectedChatUser._id
      status.friendRequestBy = userData?._id
      socket.emit("sendFriendRequest", status);
      setFriendRequest(status)

    }
  }
  const acceptRequest = async () => {
    if (userData && selectedChatUser) {
      const status = await acceptFriendRequest({ id: selectedChatUser._id })
      receiveFriendRequest(status)
      status.to = selectedChatUser._id
      socket.emit("acceptFriendRequest", status);
    }
  }


  const handleReceingCallFromSend = (data) => {
    console.log("Receiving call from:", data);
    setReceivingCall(true);
    setCaller(data.from);
    setCallerSignal(data.signal);
  }

  const handleCallAccepted = (signal) => {
    console.log("Call accepted:", signal);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: "stun:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683"
          },
          {
            urls: "turn:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683"
          }
        ]
      },
      stream: stream ?? undefined,
    });
    setCallAccepted(true);
    peer.signal(signal);
  }


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





  const handleCall = () => {
    setIsCalling(!isCalling);
    callPeer();
  }
  const handleCallClose = () => {
    setIsCalling(!isCalling);
  }


  function callPeer() {
    // Ensure userData is available for yourID
    const yourID = userData?._id;
    // Only pass stream if it's not null
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: "stun:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683"
          },
          {
            urls: "turn:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683"
          }
        ]
      },
      stream: stream ?? undefined,
    });

    peer.on("signal", data => {
      if (yourID) {
        console.log(" calling Signal data:", data);
        socket.emit("callUser", { userToCall: selectedChatUser?._id, signalData: data, from: yourID });
      }
    });

    peer.on("stream", stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });


  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream ?? undefined,
    });

    peer.on("signal", (data: unknown) => {
      socket.emit("acceptCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream: MediaStream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    // Only signal if callerSignal is not null
    if (callerSignal) {
      peer.signal(callerSignal);
    }
  }

  const handleReject = () => {
    setReceivingCall(false);
  }
  return (
    <div className=" relative flex-1 flex flex-col h-full">
      {/* Chat header */}
      <ChatHeader selectedChatUser={selectedChatUser} onOpenSidebar={onOpenSidebar} handleCall={handleCall} />

      {/* Messages area */}
      <div className=" relative flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white ">

        {
          messages?.friendStatus === enums.Accepted ? <>

            {/* <div className="flex justify-center mb-2">
              <div className="rounded py-2 px-4" style={{ backgroundColor: "#DDECF2" }}>
                <p className="text-sm uppercase">
                  February 20, 2018
                </p>
              </div>
            </div> */}

            <div className="flex justify-center mb-4">
              <div className="rounded py-2 px-4" style={{ backgroundColor: "#FCF4CB" }}>
                <p className="text-xs">
                  Messages to this chat and calls are now secured with end-to-end encryption. Tap for more info.
                </p>
              </div>
            </div>
          </> : <div className="flex justify-center h-[60vh]  items-center">

            <FriendRequestButton
              friendStatus={messages?.friendStatus}
              friendRequestBy={messages?.friendRequestBy}
              currentUserId={userData?._id}
              onSendRequest={sendFriendRequest}
              onAcceptRequest={acceptRequest}
            />


          </div>
        }
        <div className='relative' >

          {messages?.friendStatus === enums.Accepted && messages?.data?.map((message: Message) => (
            <MessageBubble messagesEndRef={messagesEndRef} chatUserName={selectedChatUser} key={message._id} message={message} />
          ))}
        </div>

      </div>

      {/* Message input */}
      <MessageInput submitMessageFunc={submitMessageFunc} receiverId={selectedChatUser?._id} />
      {isCalling && <div className="absolute inset-0 flex items-center justify-center z-50">
        <VideoCalling stream={stream}  handleCallClose={handleCallClose} videoRef={userVideo} partnerVideo={partnerVideo} />
      </div>}

      {receivingCall && <div className="absolute inset-0 flex items-center justify-center z-50">
        <IncomingCallModal handleAccept={acceptCall} handleReject={handleReject} />
      </div>
      }
    </div>
  );
};

export default ChatArea;
