import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import useTransactions from '../hooks/useTransaction';
import { dateFormatter } from '../utils/dateFormatter';
import { TransactionType } from '../utils/constants';
import { formatCurrency } from '../utils/currencyFormat';

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
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{transaction.title}</td>
              <td
                className={
                  transaction.type === TransactionType.GANANCIAS
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                {transaction.type === TransactionType.GANANCIAS
                  ? `+${formatCurrency.format(transaction.amount)}`
                  : `-${formatCurrency.format(transaction.amount)}`}
              </td>
              <td>{transaction.category.title}</td>
              <td>{dateFormatter(transaction.createdAt)}</td>
              <td>
                <button className="btn hover:bg-rose-800 ml-auto">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TransactionTable;
