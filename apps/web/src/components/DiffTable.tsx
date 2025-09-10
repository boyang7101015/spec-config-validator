import React from 'react';
import { Badge } from './ui/badge';
import { Table, Thead, Tbody, Tr, Th, Td } from './ui/table';
import type { ValidationDiff } from '../lib/types';

interface Props {
  diffs: ValidationDiff[];
}

export default function DiffTable({ diffs }: Props) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Level</Th>
          <Th>Status</Th>
          <Th>Message</Th>
        </Tr>
      </Thead>
      <Tbody>
        {diffs.map((d) => (
          <Tr key={d.id}>
            <Td>{d.id}</Td>
            <Td>{d.level}</Td>
            <Td>
              <Badge
                variant={
                  d.status === 'PASS'
                    ? 'success'
                    : d.status === 'WARN'
                    ? 'warning'
                    : 'destructive'
                }
              >
                {d.status}
              </Badge>
            </Td>
            <Td>{d.message}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
