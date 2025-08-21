export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  description: string;
  amount: number; // always positive
  type: TransactionType;
  createdAt: number; // epoch ms
}

export const STORAGE_KEY = 'expense-tracker:transactions';
