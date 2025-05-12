import { FC } from 'react';
import useTransactionsPaginated from '../hooks/useTransactionPaginated';
import { TransactionType } from '../utils/constants';
import { formatCurrency } from '../utils/currencyFormat';
import { dateFormatter } from '../utils/dateFormatter';

interface TransactionTableProps {
  limit: number;
}

const HomeTable: FC<TransactionTableProps> = ({ limit = 3 }) => {
  const { paginatedTransactions } = useTransactionsPaginated({}, 1, limit);

  return (
    <div className="bg-slate-800 px-4 py-3 rounded-md mt-4">
      <table className="w-full ">
        <thead>
          <tr>
            <td className="font-bold pb-2">Título</td>
            <td className="font-bold pb-2">Cantidad</td>
            <td className="font-bold pb-2">Categoría</td>
            <td className="font-bold pb-2">Fecha</td>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions?.map((transaction, idx) => (
            <tr key={idx}>
              <td className="pb-2">{transaction.title}</td>
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
              <td className="invisible md:visible">
                {dateFormatter(transaction.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default HomeTable;
