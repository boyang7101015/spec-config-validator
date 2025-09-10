import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { uploadSpec, uploadConfig, validateJob } from '../lib/api';
import { useI18n } from '../lib/i18n';

export default function UploadWizard() {
  const { t } = useI18n();
  const [spec, setSpec] = useState<File | null>(null);
  const [conf, setConf] = useState<File | null>(null);
  const [jobId, setJobId] = useState('default');

  async function handleUpload() {
    if (spec) await uploadSpec(spec);
    if (conf) await uploadConfig(conf);
    await validateJob(jobId);
  }

  return (
    <div className="space-y-4">
      <Input type="file" onChange={(e) => setSpec(e.target.files?.[0] || null)} />
      <Input type="file" onChange={(e) => setConf(e.target.files?.[0] || null)} />
      <Button onClick={handleUpload} disabled={!spec || !conf}>
        {t('validate.upload')}
      </Button>
    </div>
  );
}
