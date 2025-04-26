import { FC } from 'react';
import { FaPlus } from 'react-icons/fa';
import useCategories from '../hooks/useCategory';

const TransactionForm: FC = () => {
  const { categories } = useCategories();
  const length = categories?.length || 0;

  return (
    <div className="rounded-md bg-slate-800 p-4">
      <form className="grid gap-2">
        <label className="grid" htmlFor="title">
          <span>Title</span>
          <input
            className="input"
            type="text"
            placeholder="Título..."
            name="title"
            required
          />
        </label>
        <label className="grid" htmlFor="amount">
          <span>Amount</span>
          <input
            className="input"
            type="number"
            placeholder="Cantidad..."
            name="amount"
            required
          />
        </label>
        {length > 0 ? (
          <label htmlFor="category" className="grid">
            <span>Category</span>
            <select className="input bg-slate-800" name="category" required>
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
        {/* Add category */}
        <button
          //   onClick={() => {
          //     setVisibleModal(!visibleModal);
          //   }}
          className="flex max-w-fit items-center gap-2
               text-white/50 hover:text-white cursor-pointer"
        >
          <FaPlus />
          <span>Administrar categorías</span>
        </button>
        {/*Radio buttons */}
        <div className="flex gap-4 items-center">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="type"
              value={'ganancias'}
              className="form-radio text-blue-600 cursor-pointer"
            />
            <span>Ganacias</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="type"
              value={'gastos'}
              className="form-radio text-blue-600 cursor-pointer"
            />
            <span>Gastos</span>
          </label>
        </div>
        {/*Submit */}
        <button className=" btn max-w-fit btn-green mt-2">Enviar</button>
      </form>
    </div>
  );
};
export default TransactionForm;
