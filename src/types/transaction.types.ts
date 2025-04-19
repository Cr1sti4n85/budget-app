export enum Type {
  EXPENSE = 'gastos',
  INCOME = 'ganancias',
}

export type Paginated = {
  id: number;
  page: number;
  limit: number;
};
