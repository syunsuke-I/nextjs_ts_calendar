import React ,{useState} from 'react';
import { Schedule } from '../../types/Schedule';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export type EditScheduleFunction = (value: string, id: string) => void;
export type DeleteScheduleFunction = (id: string) => void;

interface Props {
  setVisibleDetailsId : React.Dispatch<React.SetStateAction<string>>;
  editSchedule : EditScheduleFunction
  deleteSchedule : DeleteScheduleFunction
  schedule : Schedule
  j : number // 列を管理する数字 例えばカレンダーの一番左は0 一番右は6
}

const CalendarComponentRUDParts = (({ setVisibleDetailsId,editSchedule,deleteSchedule,schedule,j } : Props) => {

  const [isEditing, setIsEditing] = useState(false);

  // 詳細を隠す関数
  const hideDetails = () => {
    setVisibleDetailsId('');
  };

  return (
    <div className={`absolute top-0 ml-3 w-64 p-4 bg-white rounded-md shadow-lg ${j % 6 === 0 ?  'right-full' : 'left-full'}`}>
      <div className='flex justify-end gap-x-10'>
        <div className="flex items-center justify-between rounded-t">
          <div className="flex items-center">
            <ModeEditIcon onClick={()=> setIsEditing(!isEditing)}/>
          </div>
          <div className="flex items-center">
            <DeleteIcon onClick={()=> deleteSchedule(schedule.id)}/>
          </div>
          <button type="button" className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={() => hideDetails()}>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
          </button>
        </div>
      </div>
      { isEditing ? (
        <div >
          <input defaultValue={schedule.title} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' onChange={(e)=>editSchedule(e.target.value,schedule.id)}/>
        </div>
      ) : (
        <div className=''>
          <div>
            {schedule.title}
          </div>
        </div>
      )
      }
    </div>                        
  )
}); 

export default CalendarComponentRUDParts;