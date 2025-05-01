import { FC } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionTable from '../components/TransactionTable';
import useTransactionsExpenses from '../hooks/useTransactionsExpense';
import useTransactionsIncome from '../hooks/useTransactionsIncome';
import { TransactionType } from '../utils/constants';
import { formatCurrency } from '../utils/currencyFormat';
import Chart from '../components/Chart';

const Transactions: FC = () => {
  const { transactionsExpense } = useTransactionsExpenses(
    {},
    TransactionType.GASTOS,
  );
  const { transactionsIncome } = useTransactionsIncome(
    {},
    TransactionType.GANANCIAS,
  );

  return (
    <>
      <div className="mt-4 grid grid-cols-3 items-start gap-4">
        {/**Add transaction form */}
        <div className="col-span-2 grid">
          <TransactionForm />
        </div>
        {/*Statistics */}
        <div className="rounded-md bg-slate-800 p-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="flex uppercase text-md font-bold text-center">
                Ganancia total:
              </p>
              <p className="bg-green-600 mt-2 rounded-sm p-1 text-center">
                {transactionsIncome
                  ? formatCurrency.format(transactionsIncome)
                  : '0.00'}
              </p>
            </div>
            <div>
              <p className="flex uppercase text-md font-bold text-center">
                Gasto total:
              </p>
              <p className="bg-red-600 mt-2 rounded-sm p-1 text-center">
                {transactionsExpense
                  ? formatCurrency.format(transactionsExpense)
                  : '0.00'}
              </p>
            </div>
          </div>
          {/*Chart */}
          <Chart
            totalIncome={transactionsIncome as number}
            totalExpense={transactionsExpense as number}
          />
        </div>
      </div>
      {/*Transactions Table */}
      <h1 className="my-5">
        <TransactionTable limit={10} />
      </h1>
    </>
  );
};

export default Transactions;
