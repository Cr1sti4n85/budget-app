import { FC } from 'react';
import TransactionForm from '../components/TransactionForm';

const Transactions: FC = () => {
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
                $0.00
              </p>
            </div>
            <div>
              <p className="flex uppercase text-md font-bold text-center">
                Gasto total:
              </p>
              <p className="bg-red-600 mt-2 rounded-sm p-1 text-center">
                $0.00
              </p>
            </div>
          </div>
          {/*Chart */}
          <>Grafico</>
        </div>
      </div>
      {/*Transactions Table */}
      <h1 className="my-5">Tabla de transacciones</h1>
    </>
  );
};

export default Transactions;
