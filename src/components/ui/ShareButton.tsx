'use client';

import React from 'react';
import { Share2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import ReactDOMServer from 'react-dom/server';
import { usePlanStore } from '@/lib/state';
import { translations } from '@/lib/i18n';
import PdfPlan from '../PdfPlan';

interface ShareButtonProps {
  label: string;
}

export default function ShareButton({ label }: ShareButtonProps) {
  const { title, dates, plan, language } = usePlanStore();
  const t = translations[language];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const html2pdf = (await import('html2pdf.js')).default;
        
        const pdfContainer = document.createElement('div');
        pdfContainer.innerHTML = ReactDOMServer.renderToString(
          <PdfPlan planData={plan} title={title} dates={dates} />
        );
        document.body.appendChild(pdfContainer);

        const canvas = await html2pdf().from(pdfContainer).output('canvas');
        const dataUrl = canvas.toDataURL();
  
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], `${title.replace(/\s/g, '_')}_plan.pdf`, { type: 'application/pdf' });
  
        await navigator.share({
          files: [file],
          title: title,
          text: t.messages.shareText,
        });
  
        document.body.removeChild(pdfContainer);
      } catch (error) {
        console.error('共有に失敗しました:', error);
        alert('共有に失敗しました。PDFをダウンロードして手動で共有してください。');
      }
    } else {
      alert('お使いのブラウザは共有機能をサポートしていません。PDFをダウンロードしてください。');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="group relative flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
      title={label}
    >
      <Share2 className="w-5 h-5" />
      <span className="hidden lg:inline text-sm">{label}</span>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none lg:hidden">
        {label}
      </div>
    </button>
  );
}
