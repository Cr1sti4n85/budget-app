import { FC, useEffect, useState } from 'react';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import useCategories from '../hooks/useCategory';
import { Link } from 'react-router';
import { CreateTransactionDto } from '../utils/api';
import { useCreateTransaction } from '../hooks/useCreateTransaction';

const TransactionForm: FC = () => {
  const { categories } = useCategories();
  const length = categories?.length || 0;

  const [transaction, setTransaction] = useState<CreateTransactionDto>({
    title: '',
    amount: 0,
    category: '',
    type: 'ganancias',
  });
  const {
    addTransaction,
    isPending: isAddingTransaction,
    isSuccess,
  } = useCreateTransaction(transaction);

  useEffect(() => {
    if (isSuccess) {
      setTransaction({
        title: '',
        amount: 0,
        category: '',
        type: 'ganancias',
      });
    }
  }, [isSuccess]);

  return (
    <div className="rounded-md bg-slate-800 p-4">
      <form className="grid gap-2">
        <label className="grid" htmlFor="title">
          <span>Título</span>
          <input
            className="input"
            type="text"
            placeholder="Título..."
            name="title"
            required
            onChange={(e) =>
              setTransaction({ ...transaction, title: e.target.value })
            }
            value={transaction.title}
          />
        </label>
        <label className="grid" htmlFor="amount">
          <span>Cantidad</span>
          <input
            className="input"
            type="number"
            placeholder="Cantidad..."
            name="amount"
            required
            onChange={(e) =>
              setTransaction({ ...transaction, amount: +e.target.value })
            }
            value={transaction.amount}
          />
        </label>
        {length > 0 ? (
          <label htmlFor="category" className="grid">
            <span>Categoría</span>
            <select
              className="input bg-slate-800"
              name="category"
              required
              value={transaction.category}
              onChange={(e) => {
                setTransaction({ ...transaction, category: e.target.value });
              }}
            >
              <option value="">Elige una categoría</option>
              {categories?.map((category, idx) => (
                <option key={idx} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <h1 className="mt-1 text-red-300">
            Para registrar una transacción, primero debes crear una categoría
          </h1>
        )}

        <Link
          to={'/categories'}
          className="flex max-w-fit items-center gap-2
               text-white/50 hover:text-white cursor-pointer"
        >
          <FaPlus />
          <span>Administrar categorías</span>
        </Link>
        {/*Radio buttons */}
        <div className="flex gap-4 items-center">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="type"
              value={'ganancias'}
              className="form-radio text-blue-600 cursor-pointer"
              onChange={(e) =>
                setTransaction({ ...transaction, type: e.target.value })
              }
            />
            <span>Ganacias</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="type"
              value={'gastos'}
              className="form-radio text-blue-600 cursor-pointer"
              onChange={(e) =>
                setTransaction({ ...transaction, type: e.target.value })
              }
            />
            <span>Gastos</span>
          </label>
        </div>
        {/*Submit */}
        <button
          className=" btn max-w-fit btn-green mt-2"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            addTransaction();
          }}
        >
          {isAddingTransaction && (
            <FaSpinner className="animate-spin text-2xl" />
          )}
          Enviar
        </button>
      </form>
    </div>
  );
};
export default TransactionForm;
