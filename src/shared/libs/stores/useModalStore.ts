import { create } from 'zustand';

interface ModalState {
  isModalOpen: boolean;
  modalType: 'confirm' | 'warning' | 'custom' | null;
  activeReservationId?: number | null;
  openModal: (reservationId?: number) => void;
  closeModal: () => void;
  setModalType: (type: ModalState['modalType']) => void;

  // NotificationModal
  isNotificationOpen: boolean;
  openNotification: () => void;
  closeNotification: () => void;

  // AdaptiveModal
  appear: boolean;
  appearModal: () => void;
  disappearModal: () => void;
  isDesktop: boolean | undefined;
  setIsDesktop: (state: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  // Modal
  isModalOpen: false,
  modalType: null,
  activeReservationId: null,
  openModal: (reservationId?: number) =>
    set({
      isModalOpen: true,
      ...(reservationId !== undefined && {
        activeReservationId: reservationId,
      }),
    }),
  closeModal: () =>
    set({
      isModalOpen: false,
      activeReservationId: null,
    }),
  setModalType: (type) => set({ modalType: type }),

  // Notification 모달 관련
  isNotificationOpen: false,
  openNotification: () => set({ isNotificationOpen: true }),
  closeNotification: () => set({ isNotificationOpen: false }),

  // AdaptiveModal
  appear: false,
  appearModal: () => set({ appear: true, modalType: 'custom' }),
  disappearModal: () => set({ appear: false, modalType: null }),
  isDesktop: undefined,
  setIsDesktop: (state) => set({ isDesktop: state }),
}));
