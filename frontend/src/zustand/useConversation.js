import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation}),
	messages: [],
	setMessages: (messages) => set({ messages }),

	selectedProfile: null,
  setSelectedProfile: (profile) => set({ selectedProfile: profile }),
  clearSelectedProfile: () => set({ selectedProfile: null }),
}));

export default useConversation;