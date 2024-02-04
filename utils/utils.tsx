
import { useState,useEffect } from 'react';

import {OptionType} from "../types/Schedule"

// カレンダーのデータを生成する関数
export function createCalendarData(year: number, month: number) {
  let day : Date = new Date(year, month - 1, 1);
  const end_of_month : Date = new Date(year, month, 0);
  let firstDayOfWeek : number = new Date(day.getFullYear(), day.getMonth(), 1).getDay();
  let weeksInMonth : number = Math.ceil((end_of_month.getDate() + firstDayOfWeek) / 7);

  return { day, end_of_month, firstDayOfWeek, weeksInMonth };
}

export function useCalendarNavigation() {
  let [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  let [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  let [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedOption, setSelectedOption] = useState<OptionType>('month');

  return {
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    selectedWeek,
    setSelectedWeek,
    selectedOption,
    setSelectedOption,
  };
}