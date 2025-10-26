export interface BellScheduleEntry {
  id: number;
  time: string;
  date: string;
  day: string;
  current_status: 'Rung' | 'Pending' | 'Skipped';
  isOn?: boolean;
}