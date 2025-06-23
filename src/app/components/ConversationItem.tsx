import moment from "moment";
import { AllUserType, Conversation } from "../utils/helper/types";


interface ConversationItemProps {
  conversation: AllUserType;
  isSelected: boolean;
  onClick: () => void;
}

const ConversationItem = ({ conversation, isSelected, onClick }: ConversationItemProps) => {

  return (
    <div
      onClick={onClick}
      className={`
        p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50
        ${isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : ''}
      `}
    >
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">

            {conversation.fullName.split(" ")[0].charAt(0).toUpperCase()}
          </div>
          {conversation.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1 font-bold">
            <h3 className="text-black">  {conversation?.fullName?.charAt(0)?.toUpperCase() + conversation?.fullName?.slice(1)}</h3>
            <span className="text-xs text-gray-500 flex-shrink-0">
              {moment(conversation?.lastChat?.createdAt).format("HH:mm")}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 truncate">{conversation?.lastChat?.message}</p>
            {/* {conversation.unreadCount > 0 && (
              <span className="ml-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full flex-shrink-0">
                {conversation.unreadCount}
              </span>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
