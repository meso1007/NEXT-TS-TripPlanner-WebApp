import { User } from 'lucide-react';
import Link from 'next/link';
import { usePlanStore } from '@/lib/state';
import { translations } from '@/lib/i18n';

export default function LoginButton() {
  const { language } = usePlanStore();
  const t = translations[language];

  return (
    <Link
      href="/login"
      className="group relative flex items-center gap-2 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
    >
      <User className="w-5 h-5" />
      <span className="text-md">{t.buttons.login}</span>
    </Link>
  );
}
