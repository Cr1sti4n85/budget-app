import { FC, useState } from 'react';
import useTransactions from '../hooks/useTransaction';
import Transaction from './Transaction';
import { TransactionDto } from '../utils/api';

interface TransactionTableProps {
  limit: number;
}

const TransactionTable: FC<TransactionTableProps> = ({ limit = 3 }) => {
  const { transactions } = useTransactions();

  const [data, setData] = useState<TransactionDto[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

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
