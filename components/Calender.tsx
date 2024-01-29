"use client";

import React, { useState } from 'react';
import CalendarComponent from './CalendarComponentDaysParts';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import {createCalendarData} from '../utils/utils'; 

type OptionType = 'month' | 'week';

const ParentComponent = () => {

  // 現在の年月の状態を保持
  let [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  let [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  let [selectedWeek, setSelectedWeek] = useState(0);

  const [selectedOption, setSelectedOption] = useState<OptionType>('month');
  
  const { weeksInMonth } = createCalendarData(selectedYear, selectedMonth);

  const startOfPreviousMonth = new Date(selectedYear, selectedMonth - 2, 1); // 前の月の最初の日を取得
  const endOfPreviousMonth = new Date(selectedYear, selectedMonth - 1, 0); // 前の月の最後の日を取得
  let firstDayOfPreviousMonth = startOfPreviousMonth.getDay(); // 前の月の最初の日が週のどの日にあたるかを取得
  let weeksInPreviousMonth = Math.ceil((endOfPreviousMonth.getDate() + firstDayOfPreviousMonth) / 7); // 前の月の週数を計算

  // オプションが選択されたときのハンドラ
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === 'month' || value === 'week') {
      setSelectedOption(value as unknown as OptionType);
    }
  };

  // 前の月に移動
  const goToPreviousMonth = () => {
    setSelectedMonth((prevMonth) => prevMonth === 1 ? 12 : prevMonth - 1);
    if (selectedMonth === 1) {
      setSelectedYear((prevYear) => prevYear - 1);
    }
  };

  // 次の月に移動
  const goToNextMonth = () => {
    setSelectedMonth((prevMonth) => prevMonth === 12 ? 1 : prevMonth + 1);
    if (selectedMonth === 12) {
      setSelectedYear((prevYear) => prevYear + 1);
    }
  };

  // 前の週に移動
  const goToPreviousWeek = () => {
    setSelectedWeek((prevWeek) => prevWeek === 0 ? weeksInPreviousMonth - 1 : prevWeek - 1);

    // 現在の週が月の最初の週の場合、月を更新
    if (selectedWeek === 0) {
      setSelectedMonth((prevMonth) => prevMonth === 1 ? 12 : prevMonth - 1);

      // 月が1月（0）の場合、年を更新
      if (selectedMonth === 1) {
        setSelectedYear((prevYear) => prevYear - 1);
      }
    }
  };


  // 次の週に移動
  const goToNextWeek = () => {
    setSelectedWeek((prevWeek) => prevWeek === weeksInMonth - 1 ? 0 : prevWeek + 1);
    
    // 現在の週が月の最後の週の場合、月を更新
    if (selectedWeek === weeksInMonth - 1) {
      setSelectedMonth((prevMonth) => prevMonth === 12 ? 1 : prevMonth + 1);

      // 月が12月の場合、年を更新
      if (selectedMonth === 12) {
        setSelectedYear((prevYear) => prevYear + 1);
      }
    }
  };


  return (
    <>
      <div className="flex items-center justify-between mb-4 p-3">
        <div className="flex items-center mb-4 p-5">
          {/* 月を切り替えるボタン */}
          {selectedOption !== "week" ? 
          (
            <div className="space-x-1 pr-5">
              <button className="rounded-md" onClick={goToPreviousMonth}><ArrowBackIosNewIcon/></button>
              <button className="rounded-md" onClick={goToNextMonth}><ArrowForwardIosIcon/></button>
            </div>
          ) :            
            <div className="space-x-1 pr-5">
              <button className="rounded-md" onClick={goToPreviousWeek}><ArrowBackIosNewIcon/></button>
              <button className="rounded-md" onClick={goToNextWeek}><ArrowForwardIosIcon/></button>
            </div>
          }

          {/* 年月の表示 */}
          <span className="text-lg font-bold text-gray-600">{selectedYear}年{selectedMonth}月</span>
        </div>
        <div className="flex items-center mb-4 p-3 gap-2">
          {/* 月と週の切り替え */}
          <div className="relative inline-block text-left pr-1">
            <select id="countries" className="p-3 border border-gray-300 custom-select" value={selectedOption} onChange={handleSelectChange}>
              <option value="month">月</option>
              <option value="week">週</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-600">
              <ArrowDropDownIcon />
            </span>
          </div>
          {/* 追加ボタン */}
          <span className="text-lg font-bold text-gray-600">
            <AddIcon/>
          </span>
        </div>
      </div> 
      
        <div className="bg-white rounded-lg p-5">
          <div className="grid grid-cols-7 text-center">
            <div className="w-full h-5 font-bold text-xs text-gray-300 border border-gray-300 py-1 border-b-0">日</div>
            <div className="w-full h-5 font-bold text-xs text-gray-300 border border-gray-300 py-1 border-b-0">月</div>
            <div className="w-full h-5 font-bold text-xs text-gray-300 border border-gray-300 py-1 border-b-0">火</div>
            <div className="w-full h-5 font-bold text-xs text-gray-300 border border-gray-300 py-1 border-b-0">水</div>
            <div className="w-full h-5 font-bold text-xs text-gray-300 border border-gray-300 py-1 border-b-0">木</div>
            <div className="w-full h-5 font-bold text-xs text-gray-300 border border-gray-300 py-1 border-b-0">金</div>
            <div className="w-full h-5 font-bold text-xs text-gray-300 border border-gray-300 py-1 border-b-0">土</div>
            {/* CalendarComponent のレンダリング */}
              <CalendarComponent year={selectedYear} month={selectedMonth} selectedOption={selectedOption} selectedWeek={selectedWeek} />
            </div>
        </div>
    </>
  );
};

export default ParentComponent;
