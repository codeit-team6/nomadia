import { create } from 'zustand';

interface ModalState {
  isModalOpen: boolean;
  modalType: 'confirm' | 'warning' | 'custom';
  openModal: () => void;
  closeModal: () => void;
  setModalType: (type: 'confirm' | 'warning' | 'custom') => void;
  appear: boolean;
  appearModal: () => void;
  disappearModal: () => void;
  isDesktop: boolean | undefined;
  setIsDesktop: (state: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  // Modal
  isModalOpen: false,
  modalType: 'confirm',
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  setModalType: (type: 'confirm' | 'warning' | 'custom') =>
    set({ modalType: type }),
  // AdaptiveModal
  appear: false,
  appearModal: () => set({ appear: true }),
  disappearModal: () => set({ appear: false }),
  isDesktop: undefined,
  setIsDesktop: (state) => set({ isDesktop: state }),
}));
