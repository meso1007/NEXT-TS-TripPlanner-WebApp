// /components/ArrowBox.tsx
import React from 'react';
import { usePlanStore } from '@/lib/state';

interface ArrowBoxProps {
  id: string;
  initialContent?: string;
}

const ArrowBox: React.FC<ArrowBoxProps> = ({ id, initialContent = "" }) => {
  const updateContent = usePlanStore((state) => state.updateContent);

  const [method, time] = initialContent.split(';');

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'method' | 'time') => {
    let newContent = '';
    if (field === 'method') {
      newContent = `${e.target.value};${time}`;
    } else {
      newContent = `${method};${e.target.value}`;
    }
    updateContent(id, newContent);
  };

  return (
    <div className="relative flex flex-col justify-between items-center my-4">
      {/* 矢印の線 */}
      <div className="w-1.5 h-20 bg-blue-400 relative"/>

      {/* 矢印の上に配置される入力ボックス */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 z-10 -mt-12">
        <div className="flex flex-col space-y-2">
          {/* 移動手段の入力欄 */}
          <input
            type="text"
            className="w-full text-sm text-center text-slate-700 bg-transparent outline-none placeholder-gray-400 border-2 border-gray-300 px-4 py-2 rounded-md hover:border-blue-600 focus:outline-none focus:border-blue-500 duration-200"
            placeholder="移動手段 (例: 車, 電車)"
            defaultValue={method}
            onChange={(e) => handleContentChange(e, 'method')}
          />
          {/* 移動時間の入力欄 */}
          <input
            type="text"
            className="w-full text-sm text-center text-slate-700 bg-transparent outline-none placeholder-gray-400 border-2 border-gray-300 px-4 py-2 rounded-md hover:border-blue-600 focus:outline-none focus:border-blue-500 duration-200"
            placeholder="移動時間 (例: 2時間)"
            defaultValue={time}
            onChange={(e) => handleContentChange(e, 'time')}
          />
        </div>
        
      </div>
      <div className="w-1.5 h-10 bg-blue-400 relative"/>
    </div>
  );
};

export default ArrowBox;