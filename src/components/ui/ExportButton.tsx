// /components/ExportButton.tsx
import { translations } from '@/lib/i18n';
import { usePlanStore } from '@/lib/state';
import React from 'react';

// コンポーネントが受け取るプロパティの型を定義
interface ExportButtonProps {
  onClick: () => void;
}

const ExportButton: React.FC<ExportButtonProps> = ({ onClick }) => {
  const { language } = usePlanStore();
  const t = translations[language];
  return (
    <button
      onClick={onClick}
      className="bg-emerald-600 opacity-90 cursor-pointer text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-emerald-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
    >
      {t.buttons.exportPdf}

    </button>
  );
};

export default ExportButton;