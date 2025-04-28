import { FC } from 'react';
import useTransactions from '../hooks/useTransaction';
import Transaction from './Transaction';

const TransactionTable: FC = () => {
  const { transactions } = useTransactions();

  return (
    <div className="bg-slate-800 px-4 py-3 rounded-md">
      <table className="w-full ">
        <thead>
          <tr>
            <td className="font-bold">N° </td>
            <td className="font-bold">Título</td>
            <td className="font-bold">Cantidad</td>
            <td className="font-bold">Categoría</td>
            <td className="font-bold">Fecha</td>
            <td className="text-right">Acción</td>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction, idx) => (
            <Transaction key={idx} transaction={transaction} index={idx} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TransactionTable;
