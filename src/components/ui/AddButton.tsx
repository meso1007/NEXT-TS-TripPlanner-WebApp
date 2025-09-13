import React from 'react';
import { usePlanStore } from '@/lib/state';
import { translations } from '@/lib/i18n';

// コンポーネントが受け取るプロパティの型を定義
interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  const { language } = usePlanStore();
  const t = translations[language];

  return (
    <button
      onClick={onClick}
      className="bg-blue-600 cursor-pointer text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-blue-900 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 opacity-90"
    >
      {t.buttons.addLocation}
    </button>
  );
};

export default AddButton;
