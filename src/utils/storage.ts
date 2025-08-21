import { STORAGE_KEY, Transaction } from '../types';

export function loadTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((t) => t && typeof t === 'object')
      .map((t) => ({
        id: String((t as any).id ?? ''),
        description: String((t as any).description ?? ''),
        amount: Math.abs(Number((t as any).amount ?? 0)) || 0,
        type: ((t as any).type === 'income' ? 'income' : 'expense') as 'income' | 'expense',
        createdAt: Number((t as any).createdAt ?? Date.now()),
      }))
      .filter((t) => t.id && t.description);
  } catch {
    return [];
  }
}

export function saveTransactions(items: Transaction[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}
