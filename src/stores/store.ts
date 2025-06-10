// store/chatStore.ts
import { create } from 'zustand';

interface Message {
  _id?: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt?: string;
}
interface MessageData {
  data: Message[],
  friendStatus: string,
  friendRequestBy?: string
}

interface ChatState {
  messages: MessageData;
}

interface ChatStore extends ChatState {
  setMessages: (msgs: MessageData) => void;
  addMessage: (msg: Message) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  friendStatus: '',
  messages: {
    data: [],
    friendStatus: '',
  },

  setMessages: (msgs) => {
    const state = get();
    // console.log('Current state in setMessages:', state);
    // console.log('Current msgs:', msgs);
    set({messages:msgs});
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