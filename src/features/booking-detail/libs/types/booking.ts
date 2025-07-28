// 예약 목록 조회 API 파라미터 타입
export type GetBookingParams = {
  cursorId?: number;
  size?: number;
  status?: 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';
};

// 예약 상세 조회 API 응답 타입
export type Activity = {
  id: number;
  title: string;
  bannerImageUrl: string;
};

// 예약 상세 조회 API 응답 타입
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

// 예약 목록 조회 API 응답 타입
export type GetBookingResponse = {
  totalCount: number;
  reservations: Reservation[];
  cursorId: number | null;
};

// 리뷰 작성 API 파라미터 타입
export type PostReviewParams = {
  reservationId: number;
  rating: number;
  content: string;
};
