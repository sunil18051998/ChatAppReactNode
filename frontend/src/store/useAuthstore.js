import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE == "development" ? "http://localhost:5001" : "/";

export const useAuthstore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,

    checkAuth: async() => {
        try {
            const res = axiosInstance.get("/auth/check");
            set({authUser: res.data});
            get().connectSocket();
        } catch (error) {
            console.log("error occurred in authstore = ", error);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }

    },

    signup: async(data) => {
        set({isSigningUp: true})
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            toast.success("Account Created succesfully");
            set({authUser: res.data});
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("error occurred during signup = ", error);
        } finally {
            set({isSigningUp: false})
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({ authUser: res.data });
          toast.success("Logged in successfully");
          get().connectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isLoggingIn: false });
        }
      },

    logout: async() => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged out succesfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("error occurred during signup = ", error);
        }
    },

    updateProfile: async(data) => {
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({authUser: res.data});
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("error occurred during profile update = ", error);
        } finally {
            set({isUpdatingProfile: false});
        }
    },

    connectSocket: async() => {
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL, {
            query : {
                userId: authUser._id
            }
        });
        console.log('socket = ', socket);
        socket.connect();
        set({socket: socket});

        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers: userIds});
        })
    },
    disconnectSocket: async() => {
        if(get().socket?.connected){
            get().socket.disconnect();
        }
    },


}))