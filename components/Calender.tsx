"use client";

import React, { useState } from 'react';
import CalendarComponent from './CalendarComponentDaysParts';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ParentComponent: React.FC = () => {

  // 現在の年月の状態を保持
  let [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  let [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);

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

  return (
    <>
      <div className="flex items-center mb-4 p-3">
        {/* 月を切り替えるボタン */}
        <div className="space-x-2">
          <button className="p-2 rounded-md " onClick={goToPreviousMonth}><ArrowBackIosNewIcon/></button>
          <button className="p-2 rounded-md " onClick={goToNextMonth}><ArrowForwardIosIcon/></button>
        </div>
        {/* 年月の表示 */}
        <span className="text-lg font-bold text-gray-600">{selectedYear}年{selectedMonth}月</span>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-5">
        <div className="grid grid-cols-7 text-center border border-gray-300">
          <div className="w-full h-12 font-bold text-xs text-gray-600 border border-gray-300 py-1">日</div>
          <div className="w-full h-12 font-bold text-xs text-gray-600 border border-gray-300 py-1">月</div>
          <div className="w-full h-12 font-bold text-xs text-gray-600 border border-gray-300 py-1">火</div>
          <div className="w-full h-12 font-bold text-xs text-gray-600 border border-gray-300 py-1">水</div>
          <div className="w-full h-12 font-bold text-xs text-gray-600 border border-gray-300 py-1">木</div>
          <div className="w-full h-12 font-bold text-xs text-gray-600 border border-gray-300 py-1">金</div>
          <div className="w-full h-12 font-bold text-xs text-gray-600 border border-gray-300 py-1">土</div>      
          {/* CalendarComponent のレンダリング */}
          <CalendarComponent year={selectedYear} month={selectedMonth} />
          </div>
      </div>
    </>
  );
};

export default ParentComponent;
