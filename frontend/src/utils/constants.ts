export const QueryKeys = {
  AUTH: 'auth',
  CATEGORY: 'category',
  TRANSACTION: 'transaction',
  TRANSACTION_PAGINATED: 'transaction_paginated',
  TRANSACTIONS_INCOME: 'transactions_income',
  TRANSACTIONS_EXPENSE: 'transactions_expense',
} as const;

export const TransactionType = {
  GASTOS: 'gastos',
  GANANCIAS: 'ganancias',
} as const;
