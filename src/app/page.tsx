// /app/page.tsx
'use client';

import { useState } from 'react';
import PlanBox from '@/components/ui/PlanBox';
import ArrowBox from '@/components/ui/ArrowBox';
import AddButton from '@/components/ui/AddButton';
import ExportButton from '@/components/ui/ExportButton';
import { usePlanStore } from '@/lib/state';
import ReactDOMServer from 'react-dom/server';
import { ArrowDownCircle } from 'lucide-react';
import PdfPlan from '@/components/PdfPlan';
import Header from '@/components/ui/Header';
import { translations } from '@/lib/i18n'; // 翻訳データをインポート




export default function Home() {
  const { title, dates, plan, setTitle, setDates, addLocation, removePlanItem, language } = usePlanStore();
  const t = translations[language]; // 現在の言語のテキストを取得

  const handleExportPdf = async () => {
    // クライアントサイドでのみライブラリを動的にインポート
    const html2pdf = (await import('html2pdf.js')).default;

    // PDF用のコンポーネントをHTML文字列にレンダリング
    const pdfContainer = document.createElement('div');
    pdfContainer.innerHTML = ReactDOMServer.renderToString(
      <PdfPlan planData={plan} title={title} dates={dates} />
    );

    document.body.appendChild(pdfContainer);

    const opt = {
      margin: 10,
      filename: `${title.replace(/\s/g, '_')}_plan.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // PDFを生成して保存
    html2pdf().from(pdfContainer).set(opt).save().finally(() => {
      document.body.removeChild(pdfContainer);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 p-6 flex flex-col items-center relative overflow-hidden">

      {/* より微細なグリッドパターン */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        <div className="flex flex-col items-center w-full">
          <div className="w-full ">
            <Header />
          </div>
        </div>
      <div className="w-full max-w-2xl relative z-10 text-center">
        {/* ヘッダー部分 */}
        {/* タイトルと日付入力 - プロフェッショナルスタイル */}
        <div className="mb-8 relative flex flex-col items-center">
          <div className="absolute inset-0 bf-transparent "></div>
          <input
            type="text"
            className="relative w-full text-2xl font-medium text-center text-slate-800 bg-white/90 backdrop-blur-sm outline-none placeholder-slate-400 border border-slate-200 px-8 py-5 rounded-xl focus:border-blue-300 focus:bg-white focus:shadow-md transition-all duration-200 shadow-sm hover:shadow-md mb-4"
            placeholder="旅行タイトルを入力"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="relative w-full text-lg font-normal text-center text-slate-700 bg-white/90 backdrop-blur-sm outline-none placeholder-slate-400 border border-slate-200 px-8 py-4 rounded-xl focus:border-blue-300 focus:bg-white focus:shadow-md transition-all duration-200 shadow-sm hover:shadow-md"
            placeholder="予定日 (例: 10/25 - 10/28)"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
          />
        </div>

        {/* プランコンテンツ - クリーンで洗練されたデザイン */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-white/60 rounded-2xl shadow-xl"></div>
          <div id="plan-content" className="relative space-y-6 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-100">

            {plan.length === 1 && (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-3 text-slate-600 text-lg font-normal">
                  <ArrowDownCircle className="w-5 h-5 animate-bounce text-blue-500" />
                  <span>下の「場所を追加」ボタンから旅行プランを作成しましょう</span>
                  <ArrowDownCircle className="w-5 h-5 animate-bounce text-blue-500" />
                </div>
              </div>
            )}

            {plan.map((item, index) => (
              <div key={item.id} className="relative">
                {item.type === 'location' ? (
                  <div className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                    <PlanBox
                      id={item.id}
                      placeholder={item.id === 'box-1' ? '🏠 出発地' : '📍 目的地'}
                      initialContent={item.content}
                    />
                  </div>
                ) : (
                  <div className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                    <ArrowBox id={item.id} initialContent={item.content} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ボタン群 - プロフェッショナルスタイル */}
        <div className="flex justify-center gap-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <AddButton onClick={addLocation} />
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-500 to-slate-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <ExportButton onClick={handleExportPdf} />
          </div>
        </div>

        {/* フッター - 控えめなブランディング */}
        <div className="text-center mt-12 text-slate-400 text-sm font-light">
          <div className="w-16 logo h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mb-3"></div>
          タビフロ - TABI FLOW
        </div>
      </div>
    </div>
  );
}