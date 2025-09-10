export interface ValidationDiff {
  id: string;
  level: 'P0' | 'P1' | 'P2';
  status: 'PASS' | 'FAIL' | 'WARN';
  message: string;
  expected?: string;
  actual?: string;
}
