import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import {Schedule} from '../../types/Schedule';

interface Props {
  isAdd : boolean
  setIsAdd : React.Dispatch<React.SetStateAction<boolean>>;
  setSchedules:React.Dispatch<React.SetStateAction<Schedule[]>>;
  schedules: Schedule[];
}

const AddFormComponent = ({ isAdd,setIsAdd,schedules,setSchedules } : Props) =>{

  const { register, handleSubmit, reset } = useForm<Schedule>();

  const onSubmit = (data : Schedule) => {
    const uniqueId : string = uuidv4();
    const newSchedule : Schedule = {
      id : uniqueId,
      title : data.title,
      at : data.at,
    }
    setSchedules([...schedules, newSchedule]);
    setIsAdd(!isAdd);
    reset();
  };

  const today = new Date().toISOString().split('T')[0];

  return(
    <div className={` ${isAdd ? 'fixed inset-0 bg-gray-600 bg-opacity-50 z-40 flex items-center justify-center overflow-y-auto overflow-x-hidden top-0 right-0 left-0 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'  : 'z-0 hidden'}`}>
    <div className="relative w-full max-w-md max-h-full bg-white">
      <div className='relative bg-slate-200 rounded-lg shadow'>
        <div className="flex items-center justify-between border-b rounded-t dark:border-gray-600 ">
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={()=> setIsAdd(!isAdd)}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
        </div>
      </div>
      <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 "></label>
                    <input type="text" id="title" {...register('title')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="タイトルを追加"/>
                </div>
                <div className="col-span-2 sm:col-span-1 py-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                    <input type="date" id="at" {...register('at')}  defaultValue={today} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="$2999"/>
                </div>
            </div>
            <button type="submit" className="pt-5 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">保存</button>
      </form>
    </div>
  </div>    
  )

}

export default AddFormComponent;