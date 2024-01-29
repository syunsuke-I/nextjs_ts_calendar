import React, { useState } from 'react';
import {createCalendarData} from '../utils/utils'; 

interface Props {
  year: number;
  month: number;
  selectedWeek : number
  selectedOption : "month" | "week"
  isAdd : boolean
  setIsAdd : React.Dispatch<React.SetStateAction<boolean>>;
}

const CalendarComponent = ({ year, month, selectedWeek ,selectedOption, isAdd,setIsAdd } : Props) => {
  // カレンダーのデータを生成
  const { day, end_of_month } = createCalendarData(year, month);
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

  return(
    <>
      {selectedOption !== "week" ? 
        (
          cal.map((week, i) =>
            week.map((day, j) => {
              // 今日の日付かどうかを確認
              const isToday = day === todayDate && month === currentMonth && year === currentYear;
              return (
                <div key={`day-${i}-${j}`} className={`w-full h-28 border py-2 border-gray-300 ${isToday ? 'bg-gray-200' : ''} ${i === 0 ? 'border-t-0' : ''}`}>
                  {day || ''}
                </div>
              );
            })
          )
        ) 
        : 
        (
          cal[selectedWeek].map((day, j) => {
            // 今日の日付かどうかを確認
            const isToday = day === todayDate && month === currentMonth && year === currentYear;
            return (
              <div key={`day-0-${j}`} className={`w-full border-t-0 h-svh border py-2 border-gray-300 ${isToday ? 'bg-gray-200' : ''}`}>
                {day || ''}
              </div>
            );
          })
        )
      }
      <div className={` ${isAdd ? 'fixed inset-0 bg-gray-600 bg-opacity-50 z-40 flex items-center justify-center overflow-y-auto overflow-x-hidden top-0 right-0 left-0 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'  : 'z-0 hidden'}`}>
        <div className="relative w-full max-w-md max-h-full bg-white">
          <div className='relative bg-slate-200 rounded-lg shadow dark:bg-gray-700'>
            <div className="flex items-center justify-between border-b rounded-t dark:border-gray-600 ">
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=> setIsAdd(!isAdd)}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
          </div>
          <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="タイトルを追加"/>
                    </div>
                    <div className="col-span-2 sm:col-span-1 py-5">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                        <input type="date" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999"/>
                    </div>
                </div>
                <button type="submit" className="pt-5 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">保存</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default CalendarComponent;
