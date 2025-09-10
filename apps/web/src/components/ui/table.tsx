import * as React from 'react';
import { cn } from '../../lib/utils';

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = 'Table';

const Thead = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('[&>tr]:border-b', className)} {...props} />
  )
);
Thead.displayName = 'Thead';

const Tbody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn('border-b', className)} {...props} />
);
Tbody.displayName = 'Tbody';

const Tr = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn('border-b transition-colors hover:bg-muted/50', className)}
      {...props}
    />
  )
);
Tr.displayName = 'Tr';

const Th = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn('h-10 px-2 text-left align-middle font-medium text-muted-foreground sticky top-0 bg-background', className)}
      {...props}
    />
  )
);
Th.displayName = 'Th';

const Td = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => <td ref={ref} className={cn('p-2 align-middle', className)} {...props} />
);
Td.displayName = 'Td';

export { Table, Thead, Tbody, Tr, Th, Td };
