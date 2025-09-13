// /components/PlanBox.tsx
import React from 'react';
import { usePlanStore } from '@/lib/state';
import { Clock } from 'lucide-react';

interface PlanBoxProps {
  id: string;
  placeholder?: string;
  initialContent?: string;
}

const PlanBox: React.FC<PlanBoxProps> = ({ id, placeholder = "場所と内容を入力...", initialContent = "" }) => {
  const updateContent = usePlanStore((state) => state.updateContent);
  const removePlanItem = usePlanStore((state) => state.removePlanItem);
  
  const [locationContent, time] = initialContent.split(';');

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateContent(id, `${locationContent};${e.target.value || ''}`);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateContent(id, `${e.target.value};${time || ''}`);
  };

  return (
    <div className="relative bg-white p-6 rounded-xl shadow-md border-4 border-gray-200 flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        {/* 場所と内容の入力欄 */}
        <input
          type="text"
          className="flex-grow text-lg font-medium text-slate-700 bg-transparent outline-none placeholder-gray-400 border-2 border-gray-300 px-4 py-2 rounded-md hover:border-blue-600 focus:outline-none focus:border-blue-500 duration-200"
          placeholder={placeholder}
          defaultValue={locationContent}
          onChange={handleLocationChange}
        />
        
        {/* 削除ボタン */}
        {id !== 'box-1' && (
          <button
            onClick={() => removePlanItem(id)}
            className="ml-4 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-200 cursor-pointer "
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M16.5 4.475C16.5 4.305 16.294 4 16 4h-8C7.706 4 7.5 4.305 7.5 4.475v.256c0 1.256-.475 2.443-1.353 3.25l-.04.038C5.228 8.78 5 9.474 5 10.25V19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8.75c0-.776-.228-1.47-.647-2.018l-.04-.038A4.125 4.125 0 0 1 16.5 4.731V4.475Zm-5.75 6.775a.75.75 0 0 1 1.5 0v5.5a.75.75 0 0 1-1.5 0v-5.5Zm3.5 0a.75.75 0 0 1 1.5 0v5.5a.75.75 0 0 1-1.5 0v-5.5Z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {/* 時刻の入力欄 */}
      <div className="flex items-center space-x-2">
        <input
          type="time"
          className="w-auto p-2 rounded-md bg-gray-100 text-slate-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={time}
          onChange={handleTimeChange}
        />
      </div>
    </div>
  );
};

export default PlanBox;