import { create } from 'zustand'

interface AuthState {
    isLoggedIn: boolean;
    username?: string;
    userId?: string;
    checkAuth: () => void;
    logout: () => void;
    setUserInfo: (username: string, userId: string) => void;
}

const useAuthStore = create<AuthState>(set => ({
    isLoggedIn: !!sessionStorage.getItem('authToken'),
    username: undefined,
    userId: undefined,
    checkAuth: () => {
        const token = sessionStorage.getItem('authToken')
        set({ isLoggedIn: !!token})
    },
    logout: () => {
        sessionStorage.removeItem('authToken')
        set({ isLoggedIn : false, username: undefined, userId: undefined})
    },
    setUserInfo: (username, userId) => set({ username, userId})
}))

export default useAuthStore