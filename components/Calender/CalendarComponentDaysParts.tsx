import React ,{useState} from 'react';

import {createCalendarData} from '../../utils/utils'; 
import AddFormComponent from '../Modal/AddForm';
import CalendarComponentRUDParts from './CalendarComponentRUDParts';

import { Schedule } from '../../types/Schedule';

interface Props {
  year: number;
  month: number;
  selectedWeek : number
  selectedOption : "month" | "week"
  isAdd : boolean
  setIsAdd : React.Dispatch<React.SetStateAction<boolean>>;
}

const CalendarComponent = ({ year, month, selectedWeek ,selectedOption, isAdd, setIsAdd } : Props) => {

  // カレンダーのデータを生成
  const { day, end_of_month } = createCalendarData(year, month);
  const cal : number[][] = make_cal(day, end_of_month);
  
  const today = new Date();
  const todayDate = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [visibleDetailsId, setVisibleDetailsId] = useState('');

  // 詳細を表示する関数
  const showDetails = (id : string) => {
    setVisibleDetailsId(id);
  };

  // 詳細を隠す関数
  const hideDetails = () => {
    setVisibleDetailsId('');
  };
  
  function deleteSchedule(id : string){
    const newSchedules = schedules.filter((schedule: { id: string; }) => schedule.id !== id);
    setSchedules(newSchedules);
  }

  const filterSchedulesForDay = (schedules: Schedule[], year: number, month: number, day: number) : Schedule[] => {
    return schedules.filter(schedule => {
      const scheduleDate : Date = new Date(schedule.at);
      const scheduleYear : number = scheduleDate.getFullYear();
      const scheduleMonth  : number = scheduleDate.getMonth() + 1; // getMonth()は0から始まるため、1を足す
      const scheduleDay : number = scheduleDate.getDate();
      return scheduleYear === year && scheduleMonth === month && scheduleDay === day;
    });
  };

  function editSchedule(value: string, id: string) {
    const newSchedules = schedules.map((schedule) => {
      if (schedule.id === id) {
        return { ...schedule, title: value };
      }
      return schedule;
    });
    setSchedules(newSchedules);
  }
  

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
                <div key={`day-${i}-${j}`} className={`w-full h-28 border py-2 border-gray-300 flex flex-col ${isToday ? 'bg-gray-200' : ''} ${i === 0 ? 'border-t-0' : ''}`}>
                  <div className="text-sm">{day || ''}</div>
                  {/* 予定を表示する部分 */}
                  <div className="flex-1 p-1">
                  {
                    (() => {
                      const daySchedules : Schedule[] = filterSchedulesForDay(schedules, year, month, day);
                      return (
                        <>
                          {daySchedules.slice(0, 2).map((schedule, index) => (
                            <div className='relative items-center' key={index}>
                              <div className= "bg-blue-100 rounded-md p-1 text-xs mt-1 " onClick={()=> showDetails(schedule.id)}>
                                {schedule.title}
                              </div>
                              {visibleDetailsId === schedule.id && (
                                <CalendarComponentRUDParts
                                  setVisibleDetailsId={setVisibleDetailsId}
                                  editSchedule={editSchedule}
                                  deleteSchedule={deleteSchedule}
                                  schedule={schedule}
                                  j={j}
                                />
                              )}
                            </div>
                          ))}
                          {daySchedules.length > 2 && (
                            <div className="text-xs mt-1">
                              他{daySchedules.length - 2}件
                            </div>
                          )}
                        </>
                      );
                    })()
                  }
                </div>
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
              <div key={`day-0-${j}`} className={`w-full h-svh border py-2 border-gray-300 flex flex-col ${isToday ? 'bg-gray-200' : ''}`}>
                <div className="text-sm">{day || ''}</div>
                {/* 予定を表示する部分 */}
                <div className="flex-1 x-30 overflow-visible p-1">
                  {schedules.filter((schedule: Schedule) => {
                    const scheduleDate = new Date(schedule.at);
                    const scheduleYear = scheduleDate.getFullYear();
                    const scheduleMonth = scheduleDate.getMonth() + 1;
                    const scheduleDay = scheduleDate.getDate();
                    return scheduleYear === year && scheduleMonth === month && scheduleDay === day;
                  }
                  ).map((schedule : Schedule, index : number) => (
                    <div className='relative items-center' key={index}>
                      <div className="bg-blue-100 rounded-md p-1 text-xs mt-1" onClick={()=> showDetails(schedule.id)}>
                        {schedule.title}
                      </div>
                      {visibleDetailsId === schedule.id && (
                        <CalendarComponentRUDParts
                          setVisibleDetailsId={setVisibleDetailsId}
                          editSchedule={editSchedule}
                          deleteSchedule={deleteSchedule}
                          schedule={schedule}
                          j={j}
                        />
                      )
                      } 
                    </div>
                  ))}
                </div>
              </div>              
            );
          })
        )
      }
      {/* モーダル */}
      <AddFormComponent
        isAdd={isAdd}
        setIsAdd={setIsAdd}
        setSchedules={setSchedules}
        schedules={schedules}
      />
    </>
  )
}

export default CalendarComponent;
