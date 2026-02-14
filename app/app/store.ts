import { create } from "zustand";

import Cookies from "js-cookie";

interface GlobalState {
  sidebarState: boolean;
  isLoggedIn: boolean;
  user: string | null;
  toggleSidebar: () => void;
  toggleLogin: (status: boolean) => void;
  addUser: (user: string | null) => void;
}

export const globalState = create<GlobalState>((set) => ({
  sidebarState: false,
  isLoggedIn: Cookies.get("login") ? true : false,
  user: JSON.parse(localStorage.getItem("user") || '""'),
  toggleSidebar: () => set((state) => ({ sidebarState: !state.sidebarState })),
  toggleLogin: (status) => set(() => ({ isLoggedIn: status })),
  addUser: (userEmail) => set(() => ({ user: userEmail })),
}));
