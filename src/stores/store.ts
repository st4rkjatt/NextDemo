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
  messages: Message[];
  setMessages: (msgs: Message[]) => void;
  addMessage: (msg: Message) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  setMessages: (msgs) => set({ messages: msgs }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
}));
