import { Phone, Video, MoreVertical, Menu } from 'lucide-react';
import { AllUserType } from '../utils/helper/types';


export function ChatHeader({  selectedChatUser, onOpenSidebar,handleCall }: { selectedChatUser: AllUserType | null; onOpenSidebar: (   ) => void , handleCall: () => void }) {
    return (
        <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenSidebar}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600 cursor-pointer" />
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
            <button className="p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors" onClick={handleCall}>
              <Video className="w-5 h-5 text-gray-600 cursor-pointer" />
            </button>
            <button className="p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    );
}