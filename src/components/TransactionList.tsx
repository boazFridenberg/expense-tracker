import { List, Paper, Typography } from '@mui/material';
import TransactionItem from './TransactionItem';
import type { Transaction } from '../types';

export interface TransactionListProps {
  items: Transaction[];
  onDelete: (id: string) => void;
}

export default function TransactionList({ items, onDelete }: TransactionListProps) {
  if (items.length === 0) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography color="text.secondary">No transactions yet — add your first one above.</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 1 }}>
      <List>
        {items.map((t) => (
          <TransactionItem key={t.id} item={t} onDelete={onDelete} />
        ))}
      </List>
    </Paper>
  );
}
