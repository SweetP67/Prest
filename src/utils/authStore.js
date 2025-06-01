import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(persist((set) => ({
  currentUser: null,
  setCurrentUser: (newUser) => set({ currentUser: newUser }), //Luu user vao store k bi mat khi reload trang
  removeCurrentUser: () => set({ currentUser: null }),
  updateCurrentUser: (updatedUser) => set({ currentUser: updatedUser }),
})));

export default useAuthStore;

