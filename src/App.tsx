import { useEffect, useMemo, useState } from 'react';
import { Container, CssBaseline, Stack, Typography } from '@mui/material';
import AddTransactionForm from './components/AddTransactionForm';
import TransactionList from './components/TransactionList';
import Balance from './components/Balance';
import { Transaction, TransactionType } from './types';
import { loadTransactions, saveTransactions } from './utils/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => loadTransactions());

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  const { totalIncome, totalExpense, net } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return { totalIncome: income, totalExpense: expense, net: income - expense };
  }, [transactions]);

  function addTransaction(input: { description: string; amount: number; type: TransactionType }) {
    const newTx: Transaction = {
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? (crypto as any).randomUUID() : String(Date.now()),
      description: input.description,
      amount: Math.abs(input.amount),
      type: input.type,
      createdAt: Date.now(),
    };
    setTransactions((prev) => [newTx, ...prev]);
    toast.success(`${input.type === 'income' ? 'Income' : 'Expense'} added`);
  }

  function deleteTransaction(id: string) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    toast.info('Transaction deleted');
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h4" fontWeight={700}>Your money💰</Typography>

          <AddTransactionForm onAdd={addTransaction} />

          <TransactionList items={transactions} onDelete={deleteTransaction} />

          <Balance totalIncome={totalIncome} totalExpense={totalExpense} net={net} />
        </Stack>
      </Container>

      <ToastContainer position="top-right" autoClose={2200} closeOnClick pauseOnHover theme="light" />
    </>
  );
}
