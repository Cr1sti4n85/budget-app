import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import useTransactions from '../hooks/useTransaction';

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
              <td>{transaction.amount}</td>
              <td>{transaction.category.title}</td>
              <td>{transaction.createdAt}</td>
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
