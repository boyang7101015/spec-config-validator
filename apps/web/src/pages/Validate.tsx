import React, { useState } from 'react';
import UploadWizard from '../components/UploadWizard';
import SummaryCards from '../components/SummaryCards';
import DiffTable from '../components/DiffTable';
import type { ValidationDiff } from '../lib/types';

export default function Validate() {
  const [diffs] = useState<ValidationDiff[]>([]);
  return (
    <div className="space-y-6">
      <UploadWizard />
      <SummaryCards pass={0} fail={0} warn={0} />
      <DiffTable diffs={diffs} />
    </div>
  );
}
