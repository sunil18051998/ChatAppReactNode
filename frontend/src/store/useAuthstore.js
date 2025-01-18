import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthstore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],

    checkAuth: async() => {
        try {
            const res = axiosInstance.get("/auth/check");
            set({authUser: res.data});
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
    
          //get().connectSocket();
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
    }


}))