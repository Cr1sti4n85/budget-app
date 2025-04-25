import { FC } from 'react';
import { FaPlus } from 'react-icons/fa';

const TransactionForm: FC = () => {
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
        <label htmlFor="category" className="grid">
          <span>Category</span>
          <select className="input bg-slate-800" name="category" required>
            <option value="1">Sueldo</option>
            <option value="2">Regalo</option>
            <option value="3">Mercaderia</option>
          </select>
        </label>
        {/* Add category */}
        <button
          //   onClick={() => {
          //     setVisibleModal(!visibleModal);
          //   }}
          className="mt-2 flex max-w-fit items-center gap-2
               text-white/50 hover:text-white cursor-pointer"
        >
          <FaPlus />
          <span>Administrar transacciones</span>
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
