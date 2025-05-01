import { FC, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import useTransactions from '../hooks/useTransaction';
import Transaction from './Transaction';
import useTransactionsPaginated from '../hooks/useTransactionPaginated';

interface TransactionTableProps {
  limit: number;
}

const TransactionTable: FC<TransactionTableProps> = ({ limit = 3 }) => {
  const { transactions } = useTransactions();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const { paginatedTransactions, isPlaceholderData } = useTransactionsPaginated(
    {},
    currentPage,
    limit,
  );

  useEffect(() => {
    if (transactions) {
      setTotalPages(Math.ceil(transactions.length / limit));
    }
  }, [transactions, limit]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    if (!isPlaceholderData) {
      setCurrentPage(selectedItem.selected + 1);
    }
  };

  return (
    <>
      <ReactPaginate
        className="flex gap-3 justify-end mt-4 items-center cursor-pointer"
        activeClassName="bg-blue-600 rounded-md"
        pageLinkClassName="text-white text-xs py-1 px-2 rounded-sm"
        previousClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
        nextClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
        nextLabel="Siguiente"
        previousLabel="Anterior"
        disabledClassName="text-white/50 cursor-not-allowed"
        disabledLinkClassName="text-slate-600 cursor-not-allowed"
        pageCount={totalPages}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        forcePage={currentPage - 1} // importante para evitar inconsistencia visual
        renderOnZeroPageCount={null}
      />
      <div className="bg-slate-800 px-4 py-3 rounded-md mt-4">
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
            {paginatedTransactions?.map((transaction, idx) => (
              <Transaction key={idx} transaction={transaction} index={idx} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default TransactionTable;
