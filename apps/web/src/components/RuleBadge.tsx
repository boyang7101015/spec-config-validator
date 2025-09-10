import React from 'react';
import { Badge } from './ui/badge';

interface Props {
  level: 'P0' | 'P1' | 'P2';
}

const levelMap: Record<Props['level'], 'destructive' | 'warning' | 'default'> = {
  P0: 'destructive',
  P1: 'warning',
  P2: 'default',
};

export default function RuleBadge({ level }: Props) {
  return <Badge variant={levelMap[level]}>{level}</Badge>;
}
