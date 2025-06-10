// store/chatStore.ts
import { create } from 'zustand';

interface Message {
  _id?: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt?: string;
}

interface ChatStore {
  messages: {
    friendStatus: string;
    data: Message[];
    friendRequestBy?:string
  };
  setMessages: (msgs: Message[], friendStatus?: string) => void;
  addMessage: (msg: Message) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: {
    friendStatus: '',
    data: []
  },
  setMessages: (msgs, friendStatus = '') => {
    console.log(msgs, 'msmsms')
    set({
      messages: {
        ...msgs
      }
    });
    // set({ messages: { ...msg, } })
  },
  addMessage: (msg) =>
    set((state) => ({
      messages: {
        ...state.messages,
        data: [...state.messages.data, msg]
      }
    })),
}));
