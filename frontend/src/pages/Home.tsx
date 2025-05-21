import { FC } from 'react';
import Chart from '../components/Chart';
import { TransactionType } from '../utils/constants';
import useTransactionsExpenses from '../hooks/useTransactionsExpense';
import useTransactionsIncome from '../hooks/useTransactionsIncome';
import HomeTable from '../components/HomeTable';
import useWeeklyTransactions from '../hooks/useWeeklyTransactions';
import { dateFormatter } from '../utils/dateFormatter';
import useTransactions from '../hooks/useTransaction';

const Home: FC = () => {
  const { transactions } = useTransactions();
  const { transactionsExpense } = useTransactionsExpenses(
    {},
    TransactionType.GASTOS,
  );
  const { transactionsIncome } = useTransactionsIncome(
    {},
    TransactionType.GANANCIAS,
  );

  const { weeklyTransactions } = useWeeklyTransactions();

  const { maxIncome, maxExpense, dayWithMostTransactions } = weeklyTransactions
    ? weeklyTransactions
    : {};

  return (
    <>
      {transactions?.length === 0 ? (
        <h2 className="my-5 text-center text-3xl">
          Comienza a registrar tus transacciones desde el menú de navegación
        </h2>
      ) : (
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-[40%_60%] items-start gap-4">
          {/**chart */}
          <div>
            <h2 className="my-5 text-center text-3xl">
              Gráfico de transacciones
            </h2>
            <Chart
              totalIncome={transactionsIncome as number}
              totalExpense={transactionsExpense as number}
              heigth={350}
              innerRadius={90}
              outerRadius={120}
            />
          </div>

          <div className="">
            <h2 className="my-5 text-center text-3xl">Últimos movimientos</h2>

            <HomeTable limit={8} />
          </div>
        </div>
      )}

      <div
        className="bg-slate-800 rounded-md flex flex-col lg:flex-row gap-3 
      justify-around w-full m-auto py-8 my-4"
      >
        {maxIncome && maxExpense && dayWithMostTransactions ? (
          <>
            <div className="text-center flex flex-col items-center gap-2">
              <h3 className="text-lg md:text-2xl">Mayor ingreso</h3>
              <div className="bg-slate-700 py-2 w-50 rounded-2xl">
                <p className="">{maxIncome.title.toUpperCase()}</p>
                <p className="text-green-500">${maxIncome.amount}</p>
                <p className="">{dateFormatter(maxIncome.createdAt)}</p>
              </div>
            </div>
            <div className="text-center flex flex-col items-center gap-2">
              <h3 className="text-lg md:text-2xl">Mayor gasto</h3>
              <div className="bg-slate-700 py-2 w-50 rounded-2xl">
                <p className="text-center">{maxExpense.title.toUpperCase()}</p>
                <p className="text-red-500">${maxExpense.amount}</p>
                <p className="">{dateFormatter(maxExpense.createdAt)}</p>
              </div>
            </div>
            <div className="text-center flex flex-col items-center gap-2">
              <h3 className="text-lg md:text-2xl">
                Mayor cantidad de transacciones
              </h3>
              <div className="bg-slate-700 py-2 w-50 rounded-2xl">
                <p className="">{dayWithMostTransactions.total}</p>
                <p className="">
                  {dateFormatter(dayWithMostTransactions.date)}
                </p>
                <p className="">
                  {`${dayWithMostTransactions.ganancias} ganancias | ${dayWithMostTransactions.gastos} gastos`}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="italic px-3">
              Aun no tienes transacciones para generar estadísticas
            </h2>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
