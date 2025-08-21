import { IconButton, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import type { Transaction } from '../types';

export interface TransactionItemProps {
  item: Transaction;
  onDelete: (id: string) => void;
}

export default function TransactionItem({ item, onDelete }: TransactionItemProps) {
  const isIncome = item.type === 'income';

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item.id)}>
          <DeleteOutlineIcon />
        </IconButton>
      }
      sx={{
        borderLeft: 4,
        borderColor: isIncome ? 'success.main' : 'error.main',
        bgcolor: isIncome ? 'success.light' : 'error.light',
        color: isIncome ? 'success.contrastText' : 'error.contrastText',
        mb: 1,
        borderRadius: 1,
      }}
    >
      <ListItemText
        primary={
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography fontWeight={600}>{item.description}</Typography>
            <Typography>
              {isIncome ? '+' : '-'}${item.amount.toFixed(2)}
            </Typography>
          </Stack>
        }
        secondary={new Date(item.createdAt).toLocaleString()}
      />
    </ListItem>
  );
}
