
// カレンダーのデータを生成する関数
export function createCalendarData(year: number, month: number) {
  let day : Date = new Date(year, month - 1, 1);
  const end_of_month : Date = new Date(year, month, 0);
  let firstDayOfWeek : number = new Date(day.getFullYear(), day.getMonth(), 1).getDay();
  let weeksInMonth : number = Math.ceil((end_of_month.getDate() + firstDayOfWeek) / 7);

  return { day, end_of_month, firstDayOfWeek, weeksInMonth };
}

