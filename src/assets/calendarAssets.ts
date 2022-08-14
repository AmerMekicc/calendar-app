export const monthNames: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const weekDays: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const getPrevMonth = (date: Date): Date => {
  const month = date.getMonth() - 1 === -1 ? 11 : date.getMonth() - 1;
  const year = month === 11 ? date.getFullYear() - 1 : date.getFullYear();
  return new Date(year, month);
};

export const getNextMonth = (date: Date): Date => {
  const month = date.getMonth() + 1 === 12 ? 0 : date.getMonth() + 1;
  const year = month === 0 ? date.getFullYear() + 1 : date.getFullYear();
  return new Date(year, month);
};
