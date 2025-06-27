
import { Search, Plus, MoreVertical } from 'lucide-react';

import { Conversation } from '../utils/helper/types';
import ConversationItem from './ConversationItem';
import { useEffect, useState } from 'react';

interface SidebarProps {
  conversations: Conversation[];
  selectedConversation: string;
  onSelectConversation: (id: string) => void;
  onCloseSidebar: () => void;
}


type AllUserType = {
  _id: string;
  fullName: string;
  email: string;
  mobile: string;
  friendStatus?: string | null;
  lastChat?: {
    message: string,
    createdAt: string
  }
};
type FriendLeftBoxProps = {
  selectedChatUser: AllUserType | null,
  setSelectedChatUser: (user: AllUserType) => void;
  selectedConversation: AllUserType | null;
  onSelectConversation: (conversation: AllUserType) => void;
  onCloseSidebar: () => void;
};



const Sidebar = ({ selectedChatUser, setSelectedChatUser, selectedConversation, onSelectConversation, onCloseSidebar }: FriendLeftBoxProps) => {
  const [userData, setUserData] = useState<AllUserType | undefined>(undefined);
  const [allUsers, setAllUsers] = useState<AllUserType[] | undefined>(undefined);

  useEffect(() => {
    getUserData()
    getAllUsers()
  }, [])

  const getAllUsers = async () => {
    try {

      const response = await fetch('api/getFriends');
      const data = await response.json();
      // console.log(data, 'data');
      setAllUsers(data.result);
    }
    catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  const getUserData = async () => {
    try {

      const response = await fetch('api/me');
      const data = await response.json();
      setUserData(data.result);
    }
    catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
 
  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-800">Messages</h1>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {allUsers?.map((conversation) => {
           
          return  <ConversationItem
              key={conversation._id}
              conversation={conversation}
              isSelected={selectedConversation?._id === conversation?._id}
              onClick={() => {
                onSelectConversation(conversation);
                setSelectedChatUser(conversation);
                onCloseSidebar();
              }}
            />
})}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
