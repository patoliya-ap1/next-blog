import { create } from "zustand";
import Cookies from "js-cookie";

interface GlobalState {
  sidebarState: boolean;
  isLoggedIn: boolean;
  toggleSidebar: () => void;
  toggleLogin: (status: boolean) => void;
}

export const globalState = create<GlobalState>((set) => ({
  sidebarState: false,
  isLoggedIn: Cookies.get("login") ? true : false,
  toggleSidebar: () => set((state) => ({ sidebarState: !state.sidebarState })),
  toggleLogin: (status) => set(() => ({ isLoggedIn: status })),
}));
