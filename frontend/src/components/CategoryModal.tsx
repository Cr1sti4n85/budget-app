import { FC } from 'react';

type Props = {
  type: 'post' | 'patch';
  id?: number;
  setVisibleModal: (visible: boolean) => void;
};

const CategoryModal: FC<Props> = ({ type, id = 0, setVisibleModal }) => {
  return (
    <div
      className="fixed top-0 right-0 left-0 bottom-0 w-full h-full
    bg-black/70 flex justify-center items-center"
    >
      <form className="grid gap-2 w-[300px] p-5 rounded-md bg-slate-900">
        <label htmlFor="title">
          <small>Nombre de la categoría</small>
          <input
            className="input w-full"
            type="text"
            name="title"
            placeholder="Título..."
          />
        </label>
        <div className="flex items-center gap-2">
          <button type="submit" className="btn btn-green">
            {type === 'patch' ? 'Guardar' : 'Crear'}
          </button>
          <button
            onClick={() => setVisibleModal(false)}
            className="btn btn-red"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};
export default CategoryModal;
