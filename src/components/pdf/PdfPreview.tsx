'use client';

import React from 'react';
import PdfPlan from '../PdfPlan';
import { usePlanStore } from '@/lib/state';

const PdfPreview: React.FC = () => {
  const { title, dates, plan } = usePlanStore();

  return (
    <div className="w-full h-full p-4 overflow-y-auto bg-gray-200">
      <div className="mx-auto my-8 bg-white shadow-xl rounded-lg" style={{ width: '210mm', minHeight: '297mm' }}>
        <PdfPlan planData={plan} title={title} dates={dates} />
      </div>
    </div>
  );
};

export default PdfPreview;