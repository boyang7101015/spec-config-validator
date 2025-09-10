import React from 'react';
import { useI18n } from '../lib/i18n';

export default function Rules() {
  const { t } = useI18n();
  return <div>{t('rules.placeholder')}</div>;
}
