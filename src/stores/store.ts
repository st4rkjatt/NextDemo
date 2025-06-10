// store/chatStore.ts
import { ChatState, Message, MessageData, SendFriendRequestType } from '@/app/utils/helper/types';
import { create } from 'zustand';

interface ChatStore extends ChatState {
  setMessages: (msgs: MessageData) => void;
  addMessage: (msg: Message) => void;
  setFriendRequest: (data: SendFriendRequestType) => void;
  receiveFriendRequest: (data: SendFriendRequestType) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  friendStatus: '',
  messages: {
    data: [],
    friendStatus: '',
  },
  setFriendRequest(data) {
    // const state = get();
    // console.log('abvc', state);
    set((state) => ({
      messages: {
        ...state.messages,
        friendStatus: data.friendStatus,
        friendRequestBy: data.friendRequestBy
      },
    }));
    // console.log('Current msgs:', msgs);
  },
  receiveFriendRequest(data) {
   
    set((state) => ({
      messages: {
        ...state.messages,
        friendStatus: data.friendStatus,
        friendRequestBy: data.friendRequestBy
      },
    }));
    // console.log('Current msgs:', msgs);
  },

  setMessages: (msgs) => {
    const state = get();
    // console.log('Current state in setMessages:', state);
    // console.log('Current msgs:', msgs);
    set({ messages: msgs });
    // console.log('Current state in setMessages:2', state);
  },


  addMessage: (msg) => {
    const state = get();
    console.log(msg, 'msg');
    // console.log('Current state in addMessage:', state.messages.data);
    set((state) => ({
      messages: {
        ...state.messages,
        data: [...(state.messages?.data || []), msg],
      },
    }));
  }
}));