import { create } from 'zustand'

export const useSidebarStore = create((set) => ({
  openSidebar: true,
  updateSidebar: () => set((state) => ({ openSidebar: !(state.openSidebar) })),
}))