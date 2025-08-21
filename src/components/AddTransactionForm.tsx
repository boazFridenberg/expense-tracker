import { useState } from 'react';
import { Box, Button, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import type { TransactionType } from '../types';

export interface AddTransactionFormProps {
  onAdd: (input: { description: string; amount: number; type: TransactionType }) => void;
}

export default function AddTransactionForm({ onAdd }: AddTransactionFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [type, setType] = useState<TransactionType>('expense');

  const canSubmit = description.trim().length > 0 && Number(amount) > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amt = Number(amount);
    if (!canSubmit) return;
    onAdd({ description: description.trim(), amount: Math.abs(amt), type });
    setDescription('');
    setAmount('');
    setType('expense');
  }

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: 2, mb: 3 }} elevation={3}>
      <Typography variant="h6" sx={{ mb: 1 }}>Add Transaction</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Amount"
          type="number"
          inputProps={{ step: '0.01', min: '0' }}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <TextField
          select
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="expense">Expense</MenuItem>
        </TextField>
        <Box>
          <Button type="submit" variant="contained" size="large" disabled={!canSubmit} sx={{ height: '100%' }}>
            Add
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
