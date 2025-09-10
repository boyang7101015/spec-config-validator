import React from 'react';
import { useI18n } from '../lib/i18n';

export default function Dashboard() {
  const { t } = useI18n();
  return <div>{t('dashboard.welcome')}</div>;
}
