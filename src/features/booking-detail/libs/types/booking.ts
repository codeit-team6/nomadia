export type GetBookingParams = {
  cursorId?: number;
  size?: number;
  status?: 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';
};

export type Activity = {
  id: number;
  title: string;
  bannerImageUrl: string;
};

export type Reservation = {
  activity: Activity;
  scheduleId: number;
  id: number;
  teamId: string;
  userId: number;
  status: 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  createdAt: string;
  updatedAt: string;
};

export type GetBookingResponse = {
  totalCount: number;
  reservations: Reservation[];
  cursorId: number | null;
};
