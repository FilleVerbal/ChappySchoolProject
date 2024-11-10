import { create } from 'zustand'
import { Channel, Message, FetchedUsers } from './datastructures';

interface AuthState {
    isLoggedIn: boolean;
    username?: string;
    userId?: string;
    checkAuth: () => void;
    logout: () => void;
    setUserInfo: (username: string, userId: string) => void;
    selectedChannel?: string;
    selectedUser?: string;
    setSelectedChannel: (channelId: string) => void;
    setSelectedUser: (userId: string) => void;
    messages: Message[];
    channels: Channel[];
    users: FetchedUsers[];
    setMessages: (messages: Message[]) => void;
    setChannels: (channels: Channel[]) => void;
    setUsers:(users: FetchedUsers[]) => void;
    // this might be overdoint it but just in case
    addMessage: (message: Message) => void;
}

const useAuthStore = create<AuthState>(set => ({
    isLoggedIn: !!sessionStorage.getItem('authToken'),
    username: undefined,
    userId: undefined,
    selectedChannel: undefined,
    selectedUser: undefined,
    messages: [],
    channels: [],
    users: [],
    checkAuth: () => {
        const token = sessionStorage.getItem('authToken')
        set({ isLoggedIn: !!token})
    },
    logout: () => {
        sessionStorage.removeItem('authToken')
        set({ isLoggedIn : false, username: undefined, userId: undefined, selectedChannel: undefined, selectedUser: undefined, channels: [], users: []})
    },
    setUserInfo: (username, userId) => set({ username, userId}),
    setSelectedChannel: (channelId) => set({selectedChannel: channelId, selectedUser: undefined}),
    setSelectedUser: (userId) => set({selectedUser: userId, selectedChannel: undefined}),
    setMessages: (messages) => set({messages}),
    setChannels: (channels) => set({channels}),
    setUsers: (users) => set({users}),
    // this might be overdoing it but just in case
    addMessage: (message) => set(state => ({messages: [...state.messages, message]}))
}))

export default useAuthStore