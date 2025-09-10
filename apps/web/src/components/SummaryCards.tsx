import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

interface Props {
  pass: number;
  fail: number;
  warn: number;
}

export default function SummaryCards({ pass, fail, warn }: Props) {
  const items = [
    { label: 'PASS', value: pass },
    { label: 'FAIL', value: fail },
    { label: 'WARN', value: warn },
  ];
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <Card key={item.label}>
          <CardHeader>
            <CardTitle>{item.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
