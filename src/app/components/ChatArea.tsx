
import { Phone, Video, MoreVertical, Menu } from 'lucide-react';

import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { AllUserType, Conversation, Message, SendFriendRequestType } from '../utils/helper/types';
import { useEffect, useRef, useState } from 'react';
import { useChatStore } from '@/stores/store';
import socket from '../utils/helper/socketGlobal';
import { acceptFriendRequest, friendRequest } from '../utils/helper/allApiCalls';
import { enums } from '../utils/helper/enums';
import FriendRequestButton from './friendRequestButton';



interface TypingType {
  senderId: string;
  receiverId: string;
}


const ChatArea = ({ selectedChatUser, onOpenSidebar }: { selectedChatUser: AllUserType | null; onOpenSidebar: () => void }) => {


  const [userData, setUserData] = useState<AllUserType | null>(null);
  const [typing, setTyping] = useState<boolean>(false);
  const { messages, setMessages, addMessage, setFriendRequest, receiveFriendRequest, receiverFriendAccept } = useChatStore();
  const getUserData = async () => {
    try {
      const response = await fetch('/api/me');
      const data = await response.json();
      setUserData(data.result);
    }
    catch (error) {
      console.error("Error fetching user data:", error);
    }
  }



  useEffect(() => {
    getUserData();
  }, [])


  useEffect(() => {
    if (selectedChatUser) {
      getConversation()
      if (!userData) return;

      const userDetails = {
        userId: userData._id,
      };

      socket.emit('registerUser', userDetails);

    }
  }, [selectedChatUser])

  const getConversation = async () => {
    try {
      const response = await fetch(`/api/getconversation/${selectedChatUser?._id}`);
      const data = await response.json();
      // console.log(data.result, 'data.result')
      setMessages(data.result);
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };


  const messagesEndRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (!socket) return;
    socket.on("receiveMessage", handleIncomingMessage);
    socket.on("receiveFriendRequest", handleReceiveFriendRequest);
    socket.on("receiveAcceptFriendRequest", handleReceiveFriendRequestAccept);
    socket.on("receiveTyping", handleReceivingTyping);
    return () => {
      socket.off("receiveMessage", handleIncomingMessage);
      socket.off("receiveFriendRequest", handleReceiveFriendRequest);
      socket.off("receiveAcceptFriendRequest", handleReceiveFriendRequestAccept);
      socket.off("receiveTyping", handleReceivingTyping);
    };
  }, []);

  const handleTyping = () => {
    const newMessage = {
      senderId: userData?._id,
      receiverId: selectedChatUser?._id,
    };

    if (socket.connected) {
      socket.emit("typing", newMessage);
    }
  }

  const handleReceivingTyping = (data: TypingType) => {
    console.log("Received typing data:", data);
    console.log(selectedChatUser, 'data.receiverId === selectedChatUser?._id');
    if (data.receiverId === selectedChatUser?._id) {
      console.log("Receiving typing...", data);
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
      }, 2000); // Clear typing after 2 seconds
    }

  }
  console.log(selectedChatUser, 'messages in chat area');
  if (!selectedChatUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Menu className="w-10 h-10 text-gray-400"   onClick={onOpenSidebar} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
          <p className="text-gray-600">Choose a conversation from the sidebar to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenSidebar}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            <div className="relative  ">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {selectedChatUser?.fullName?.split(" ")[0].charAt(0).toUpperCase()}
              </div>
              {selectedChatUser?.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">{selectedChatUser?.fullName}</h2>
              <p className="text-sm text-gray-500">
                {selectedChatUser?.isOnline ? 'Online' : 'Last seen recently'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Video className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">

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
        {messages?.friendStatus === enums.Accepted && messages?.data?.map((message: Message) => (
          <MessageBubble chatUserName={selectedChatUser} key={message._id} message={message} />
        ))}
      </div>

      {/* Message input */}
      <MessageInput handleTyping={handleTyping} submitMessageFunc={submitMessageFunc} receiverId={selectedChatUser?._id} />
    </div>
  );
};

export default ChatArea;
