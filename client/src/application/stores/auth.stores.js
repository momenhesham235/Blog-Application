import { create } from "zustand";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "@/infrastructure/services/auth/auth";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("blog-user")) || null,

  registerUser: async (userData) => {
    const user = await registerUser(userData);
    console.log(user);
    set({ user });
  },
  loginUser: async (userData) => {
    const user = await loginUser(userData);
    // console.log(user);
    set({ user });
  },
  logoutUser: async () => {
    await logoutUser();
    set({ user: null });
  },
}));

export default useAuthStore;
