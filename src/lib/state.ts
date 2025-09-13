// /lib/state.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Language = 'ja' | 'en'; // サポートする言語の型を定義

// プランのアイテムの型を定義
interface PlanItem {
  id: string;
  type: 'location' | 'arrow';
  content: string;
}

// ストアの型を定義
interface PlanStore {
  title: string;
  dates: string;
  plan: PlanItem[];
  language: Language; // 言語設定を追加
  setTitle: (title: string) => void;
  setDates: (dates: string) => void;
  setLanguage: (lang: Language) => void; // 言語設定を更新するアクション
  addLocation: () => void;
  updateContent: (id: string, content: string) => void;
  removePlanItem: (id: string) => void;
}

// Zustandストアの作成
export const usePlanStore = create<PlanStore>()(
  persist(
    (set, get) => ({
      // 初期状態
      title: '私の旅行プラン',
      dates: '',
      plan: [{ id: 'box-1', type: 'location', content: '出発地;' }],
      language: 'ja', // 初期言語は日本語

      // タイトルを更新するアクション
      setTitle: (newTitle) => set({ title: newTitle }),
      
      // 予定日を更新するアクション
      setDates: (newDates) => set({ dates: newDates }),

      // 言語を更新するアクション
      setLanguage: (lang) => set({ language: lang }),

      // 場所を追加するアクション
      addLocation: () =>
        set((state) => {
          const newPlan = [
            ...state.plan,
            { id: `arrow-${state.plan.length + 1}`, type: 'arrow', content: '移動手段、時間などを入力...' },
            { id: `box-${state.plan.length + 2}`, type: 'location', content: ';' },
          ];
          return { ...state, plan: newPlan };
        }),

      // 内容を更新するアクション
      updateContent: (id, content) =>
        set((state) => ({
          ...state,
          plan: state.plan.map((item) => (item.id === id ? { ...item, content } : item)),
        })),
      
      // 要素を削除するアクション
      removePlanItem: (id) =>
        set((state) => {
          const itemIndex = state.plan.findIndex(item => item.id === id);
          if (itemIndex > 0) {
            const newPlan = state.plan.filter((item, index) => index !== itemIndex && index !== itemIndex - 1);
            return { ...state, plan: newPlan };
          }
          return state;
        }),
    }),
    {
      name: 'travel-plan-storage', // ローカルストレージに保存するキー
      storage: createJSONStorage(() => localStorage),
    }
  )
);