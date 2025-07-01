import { ChatState, Message, MessageData, SendFriendRequestType, UserType } from '@/app/utils/helper/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChatStore extends ChatState {
  me: UserType | null;
  setMe: (user: UserType) => void;
  setMessages: (msgs: MessageData) => void;
  addMessage: (msg: Message) => void;
  setFriendRequest: (data: SendFriendRequestType) => void;
  receiveFriendRequest: (data: SendFriendRequestType) => void;
  receiverFriendAccept: (data: SendFriendRequestType) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      me: null,
      setMe: (user: UserType) => set({ me: user }),
      friendStatus: '',
      messages: {
        data: [],
        friendStatus: '',
      },
      setMessages: (msgs) => {
        set({ messages: msgs });
      },
      addMessage: (msg) => {
        const state = get();
        set({
          messages: {
            ...state.messages,
            data: [...(state.messages?.data || []), msg],
          },
        });
      },
      setFriendRequest(data) {
        set((state) => ({
          messages: {
            ...state.messages,
            friendStatus: data.friendStatus,
            friendRequestBy: data.friendRequestBy,
          },
        }));
      },
      receiveFriendRequest(data) {
        set((state) => ({
          messages: {
            ...state.messages,
            friendStatus: data.friendStatus,
            friendRequestBy: data.friendRequestBy,
          },
        }));
      },
      receiverFriendAccept(data) {
        set((state) => ({
          messages: {
            ...state.messages,
            friendStatus: data.friendStatus,
            friendRequestBy: data.friendRequestBy,
          },
        }));
      },
    }),
    {
      name: 'chat-storage', // localStorage key
      partialize: (state) => ({
        me: state.me,
        messages: state.messages,
      }),
    }
  )
);
