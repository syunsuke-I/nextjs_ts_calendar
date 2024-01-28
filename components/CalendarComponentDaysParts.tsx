import React, { useState } from 'react';

interface Props {
  year: number;
  month: number;
}

const CalendarComponent: React.FC<Props> = ({ year, month }) => {
  // カレンダーのデータを生成
  let day : Date = new Date(year, month - 1, 1);
  const end_of_month : Date = new Date(year, month, 0);
  const cal : number[][] = make_cal(day, end_of_month);

  const today = new Date();
  const todayDate = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  function make_cal(day: Date, end_of_month: Date): number[][] {

    // 必要な行数（週の数）を計算
    let firstDayOfWeek : number = new Date(day.getFullYear(), day.getMonth(), 1).getDay();
    let weeksInMonth : number = Math.ceil((end_of_month.getDate() + firstDayOfWeek) / 7);
  
    // カレンダーの初期化
    let cal: number[][] = new Array(weeksInMonth).fill(null).map(() => new Array(7).fill(null));
  
    // 第何週かを管理する
    let week_num : number = 0;
    day.setDate(1);  // 日付を月の初日にリセット
  
    for (let i = 1; i <= end_of_month.getDate(); i++) {
      cal[week_num][day.getDay()] = i;
      if (day.getDay() === 6) week_num++;
      day.setDate(day.getDate() + 1);
    }
    return cal;
  }

  return cal.flatMap((week, i) =>
    week.map((day, j) => {
      // 今日の日付かどうかを確認
      const isToday = day === todayDate && month === currentMonth && year === currentYear;
      return (
        <div key={`day-${i}-${j}`} className={`w-full h-28 border py-2 border-gray-300 ${isToday ? 'bg-gray-200' : ''} ${i === 0 ? 'border-t-0' : ''}`}>
          {day || ''}
        </div>
      );
    })
);
}

export default CalendarComponent;
