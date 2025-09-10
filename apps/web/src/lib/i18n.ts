import React, { createContext, useContext, useState } from 'react';

type Lang = 'en-US' | 'zh-TW';

type Dict = Record<Lang, Record<string, string>>;

const dict: Dict = {
  'en-US': {
    'nav.dashboard': 'Dashboard',
    'nav.validate': 'Validate',
    'nav.rules': 'Rules',
    'dashboard.welcome': 'Welcome to Spec vs Config Validator',
    'validate.upload': 'Upload and Validate',
    'rules.placeholder': 'Rules editor coming soon.',
  },
  'zh-TW': {
    'nav.dashboard': '儀表板',
    'nav.validate': '驗證',
    'nav.rules': '規則',
    'dashboard.welcome': '歡迎使用規格與設定驗證器',
    'validate.upload': '上傳並驗證',
    'rules.placeholder': '規則編輯器即將推出',
  },
};

interface I18nContextType {
  lang: Lang;
  t: (key: string) => string;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('zh-TW');
  const t = (key: string) => dict[lang][key] ?? key;
  return <I18nContext.Provider value={{ lang, t, setLang }}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
