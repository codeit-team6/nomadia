export const mockSchedules = [
  {
    id: 1,
    date: '2025-07-01',
    startTime: '12:00',
    endTime: '13:00',
  },
  {
    id: 2,
    date: '2025-07-07',
    startTime: '15:00',
    endTime: '17:00',
  },
  {
    id: 3,
    date: '2025-07-22',
    startTime: '9:00',
    endTime: '13:00',
  },
];
//1 7 22

export interface Schedules {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}
