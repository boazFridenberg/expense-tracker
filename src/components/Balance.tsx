import { Grid, Paper, Typography } from '@mui/material';

export interface BalanceProps {
  totalIncome: number;
  totalExpense: number;
  net: number; // income - expense
}

export default function Balance({ totalIncome, totalExpense, net }: BalanceProps) {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Total Income</Typography>
          <Typography variant="h5" color="success.main">${totalIncome.toFixed(2)}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Total Expense</Typography>
          <Typography variant="h5" color="error.main">${totalExpense.toFixed(2)}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Net (Income - Expense)</Typography>
          <Typography variant="h5" color={net >= 0 ? 'success.main' : 'error.main'}>
            ${net.toFixed(2)}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
