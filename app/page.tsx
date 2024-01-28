import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function Calendar() {
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-5">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold text-gray-600">2024年1月</span>
        <div className="space-x-2">
          <button className="p-2 rounded-md "><ArrowBackIosNewIcon/></button>
          <button className="p-2 rounded-md "><ArrowForwardIosIcon/></button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center border border-gray-300">
        {/* 曜日 */}
        <div className="w-full h-12 font-bold text-xs text-gray-600 border border-gray-300 py-1">日</div>
        <div className="w-full h-12 font-bold text-xs text-gray-600 border border-gray-300 py-1">月</div>
        <div className="w-full h-12 font-bold text-xs text-gray-600 border border-gray-300 py-1">火</div>
        <div className="w-full h-12 font-bold text-xs text-gray-600 border border-gray-300 py-1">水</div>
        <div className="w-full h-12 font-bold text-xs text-gray-600 border border-gray-300 py-1">木</div>
        <div className="w-full h-12 font-bold text-xs text-gray-600 border border-gray-300 py-1">金</div>
        <div className="w-full h-12 font-bold text-xs text-gray-600 border border-gray-300 py-1">土</div>
        {/* 日付 */}
        <div className="w-full h-20 border py-2 border-gray-300">1</div>
        <div className="w-full h-20 border py-2 border-gray-300">2</div>
        <div className="w-full h-20 border py-2 border-gray-300">3</div>
        <div className="w-full h-20 border py-2 border-gray-300">4</div>
        <div className="w-full h-20 border py-2 border-gray-300">5</div>
        <div className="w-full h-20 border py-2 border-gray-300">6</div>
        <div className="w-full h-20 border py-2 border-gray-300">7</div>
      </div>
    </div>
  );
}

export default Calendar;
