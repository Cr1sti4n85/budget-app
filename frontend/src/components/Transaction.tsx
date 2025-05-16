import { FC } from 'react';
import type { TransactionDto } from '../utils/api';
import { TransactionType } from '../utils/constants';
import { formatCurrency } from '../utils/currencyFormat';
import { dateFormatter } from '../utils/dateFormatter';
import { FaTrash } from 'react-icons/fa';
import { useDeleteTransaction } from '../hooks/useDeleteTransaction';

interface TransactionProps {
  transaction: TransactionDto;
  index: number;
}
const Transaction: FC<TransactionProps> = ({ transaction, index }) => {
  const { deleteTransaction } = useDeleteTransaction(transaction.id);

  return (
    <tr>
      <td className="hidden md:table-cell">{index + 1}</td>
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
      <td className="hidden md:table-cell">{transaction.category.title}</td>
      <td className="hidden md:table-cell">
        {dateFormatter(transaction.createdAt)}
      </td>
      <td>
        <button
          className="btn hover:bg-rose-800 ml-auto"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            deleteTransaction();
          }}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};
export default Transaction;
