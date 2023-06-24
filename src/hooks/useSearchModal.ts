import { create } from 'zustand'

type Store = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useSearchModal = create<Store>()((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen:true}),
  onClose: () => set({isOpen:false}),
}))


export default useSearchModal