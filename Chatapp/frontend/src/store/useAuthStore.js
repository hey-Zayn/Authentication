import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";


export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],


    checkAuth: async () => {
        try {
            set({ isCheckingAuth: true })
            const res = await axiosInstance.get('/auth/check-auth');
            set({ authUser: res.data.user })
        } catch (error) {
            console.log("Error in checkAuth:", error)
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    userLogin: async (data) => {
        try {
            set({ isLoggingIn: true })
            const res = await axiosInstance.post('/auth/login', data)
            if (res.data.success) {
                set({ authUser: res.data.user })
                toast.success("User logged in successfully")
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        } finally {
            set({ isLoggingIn: false })
        }
    },

    userSignup: async (data) => {
        try {
            set({ isSigningUp: true })
            const res = await axiosInstance.post('/auth/register', data)
            if (res.data.success) {
                console.log(res)
                set({ authUser: res.data.user })
                toast.success("User created successfully")
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        } finally {
            set({ isSigningUp: false })
        }
    },

    userLogout: async () => {
        try {
            set({ isLoggingOut: true })
            const res = await axiosInstance.post('/auth/logout')
            if (res.data.success) {
                set({ authUser: null })
                toast.success("User logged out successfully")
            }
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoggingOut: false })
        }
    }

}))