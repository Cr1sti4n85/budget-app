export enum Type {
  EXPENSE = 'gastos',
  INCOME = 'ganancias',
}

export type Paginated = {
  id: number;
  page: number;
  limit: number;
};

//weekly transactions
type DailyStats = {
  date: string;
  total: number;
  ganancias: number;
  gastos: number;
};

export type TransactionsByDate = {
  [date: string]: DailyStats;
};
