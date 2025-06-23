import moment from "moment";
import { AllUserType, Message } from "../utils/helper/types";




const MessageBubble = ({ chatUserName, message }: { chatUserName: AllUserType, message: Message }) => {
  // console.log(chatUserName?._id === message.senderId, 'chatUserName?._id === message.receiverId')
  return (<>

    <div className={`flex ${chatUserName?._id === message.receiverId ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${chatUserName?._id === message.receiverId ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {chatUserName?._id === message.senderId && (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
            {chatUserName?.fullName?.split(" ")[0].charAt(0).toUpperCase()}
          </div>
        )}

        <div className="flex flex-col">
          <div
            className={`
              px-4 py-2 rounded-2xl shadow-sm
              ${chatUserName?._id === message.receiverId
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
              }
            `}
          >
            <p className="text-sm leading-relaxed">{message.message}</p>
          </div>
          <span className={`text-xs text-gray-500 mt-1 ${chatUserName?._id !== message.senderId ? 'text-right' : 'text-left'}`}>

            {moment(message?.lastChat?.createdAt).format("HH:mm")}
          </span>
        </div>
      </div>
    </div>
  </>
  );
};

export default MessageBubble;
