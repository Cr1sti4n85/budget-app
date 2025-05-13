import { FC } from 'react';
import Chart from '../components/Chart';
import { TransactionType } from '../utils/constants';
import useTransactionsExpenses from '../hooks/useTransactionsExpense';
import useTransactionsIncome from '../hooks/useTransactionsIncome';
import HomeTable from '../components/HomeTable';
import useWeeklyTransactions from '../hooks/useWeeklyTransactions';

const Home: FC = () => {
  const { transactionsExpense } = useTransactionsExpenses(
    {},
    TransactionType.GASTOS,
  );
  const { transactionsIncome } = useTransactionsIncome(
    {},
    TransactionType.GANANCIAS,
  );

  const { weeklyTransactions } = useWeeklyTransactions();

  return (
    <div className="mt-4 grid grid-cols-1 lg:grid-cols-[40%_60%] items-start gap-4">
      {/**chart */}
      <div>
        <h1 className="my-5 text-center text-4xl">Gráfico del mes actual</h1>
        <Chart
          totalIncome={transactionsIncome as number}
          totalExpense={transactionsExpense as number}
          heigth={400}
          innerRadius={90}
          outerRadius={120}
        />
      </div>

      <div>
        <h1 className="my-5 text-center text-4xl">Últimos movimientos</h1>
        <HomeTable limit={8} />
      </div>
      <div>
        <h2 className="my-5 text-center text-4xl">
          Información últimos 7 días
        </h2>
      </div>
    </div>
  );
};

export default Home;
