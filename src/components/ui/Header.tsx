'use client';

import { useState } from 'react';
import { 
  MapPin, 
  Settings, 
  HelpCircle, 
  Globe, 
  Menu,
  X,
  Plane,
  User
} from 'lucide-react';
import LoginButton from './LoginButton';
import { usePlanStore } from '@/lib/state';
import { translations } from '@/lib/i18n';
import Image from 'next/image';
import ShareButton from './ShareButton';


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage } = usePlanStore();
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === 'ja' ? 'en' : 'ja');
  };
  const handleExportPdf = async () => {
    // クライアントサイドでのみライブラリを動的にインポート
    const html2pdf = (await import('html2pdf.js')).default;
    // ... (handleExportPdfのロジックは省略)
  };


  return (
    <header className="relative w-full max-w-4xl mx-auto mb-8">
      {/* メインヘッダー */}
      <div className="relative bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          {/* ロゴセクション */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-28 h-24">
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
              <div className="relative p-3 rounded-xl  transition-all duration-300 transform group-hover:scale-105">
                <Image src="/logo.png" alt="Logo" width={100} height={100} className="w-full h-full object-contain text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl logo font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                {t.header.title}
              </h1>
              <p className="text-sm text-slate-500 font-light">
                {t.header.subtitle}
              </p>
            </div>
          </div>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center gap-2">
            <NavButton icon={Globe} label={language === 'ja' ? 'English' : '日本語'} onClick={toggleLanguage} />
            <NavButton icon={HelpCircle} label={t.buttons.help} />
            <NavButton icon={Settings} label={t.buttons.settings} />
            <ShareButton label={t.buttons.share} />
          </nav>

          {/* モバイルメニューボタン */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl shadow-xl z-50 md:hidden">
            <div className="p-4 space-y-2">
              <MobileNavItem icon={Globe} label={language === 'ja' ? 'English' : '日本語'} onClick={toggleLanguage} />
              <MobileNavItem icon={HelpCircle} label={t.buttons.help} />
              <MobileNavItem icon={Settings} label={t.buttons.settings} />
              <MobileNavItem icon={User} label={t.buttons.account} />
            </div>
          </div>
        )}
      </div>

      {/* サブヘッダー - ブレッドクラムやステータス */}
      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{t.messages.newPlan}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>{t.messages.realtimeSave}</span>
          </div>

          <div className="text-xs bg-slate-100 px-2 py-1 rounded-full">
            v2.1.0
          </div>
        </div>
      </div>
    </header>
  );
}

// デスクトップ用ナビゲーションボタン
function NavButton({ icon: Icon, label, onClick }: { icon: any; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 cursor-pointer rounded-lg transition-all duration-200 font-medium"
      title={label}
    >
      <Icon className="w-5 h-5" />
      <span className="hidden lg:inline text-md">{label}</span>

      {/* ツールチップ */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-lg rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none lg:hidden">
        {label}
      </div>
    </button>
  );
}

// モバイル用ナビゲーションアイテム
function MobileNavItem({ icon: Icon, label, onClick }: { icon: any; label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 opacity-90">
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );
}
