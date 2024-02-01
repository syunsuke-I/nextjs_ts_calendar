import React ,{useState} from 'react';
import {createCalendarData} from '../../utils/utils'; 
import AddFormComponent from '../Modal/AddForm';
import {Schedule} from '../../types/Schedule';

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

  const filterSchedulesForDay = (schedules: Schedule[], year: number, month: number, day: number) : Schedule[] => {
    return schedules.filter(schedule => {
      const scheduleDate : Date = new Date(schedule.at);
      const scheduleYear : number = scheduleDate.getFullYear();
      const scheduleMonth  : number = scheduleDate.getMonth() + 1; // getMonth()は0から始まるため、1を足す
      const scheduleDay : number = scheduleDate.getDate();
      return scheduleYear === year && scheduleMonth === month && scheduleDay === day;
    });
  };  

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
                              <div className={`absolute top-0 ml-3 z-50 w-64 p-4 bg-white rounded-md shadow-lg ${j % 6 === 0 ?  'right-full' : 'left-full'}`}>
                                <div className='relative'>
                                  <div className="flex items-center justify-between rounded-t ">
                                      <button type="button" className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={() => hideDetails()}>
                                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                          </svg>
                                          <span className="sr-only">Close modal</span>
                                      </button>
                                  </div>
                                </div>
                                  <p>予定の詳細情報</p>
                                  {/* 詳細情報を表示 */}
                              </div>
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
                <div className="flex-1 overflow-y-auto p-1">
                  {schedules.filter(schedule => {
                    const scheduleDate = new Date(schedule.at);
                    const scheduleYear = scheduleDate.getFullYear();
                    const scheduleMonth = scheduleDate.getMonth() + 1;
                    const scheduleDay = scheduleDate.getDate();
                    return scheduleYear === year && scheduleMonth === month && scheduleDay === day;
                  }).map((schedule, index) => (
                    <div key={index} className="bg-blue-100 rounded-md p-1 text-xs mt-1">
                      {schedule.title}
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
