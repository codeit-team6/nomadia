export interface Schedules {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface MonthReservations {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}
