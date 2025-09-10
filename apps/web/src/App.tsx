import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Validate from './pages/Validate';
import Rules from './pages/Rules';
import { I18nProvider, useI18n } from './lib/i18n';

function Nav() {
  const { t, lang, setLang } = useI18n();
  return (
    <header className="shadow-sm mb-4">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <div className="flex gap-4">
          <NavLink to="/" className="font-medium" end>
            {t('nav.dashboard')}
          </NavLink>
          <NavLink to="/validate" className="font-medium">
            {t('nav.validate')}
          </NavLink>
          <NavLink to="/rules" className="font-medium">
            {t('nav.rules')}
          </NavLink>
        </div>
        <select
          className="border rounded-md px-2 py-1"
          value={lang}
          onChange={(e) => setLang(e.target.value as any)}
        >
          <option value="zh-TW">中文</option>
          <option value="en-US">EN</option>
        </select>
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Nav />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/validate" element={<Validate />} />
            <Route path="/rules" element={<Rules />} />
          </Routes>
        </main>
      </BrowserRouter>
    </I18nProvider>
  );
}
