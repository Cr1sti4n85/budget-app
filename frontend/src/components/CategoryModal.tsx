import { FC, useState } from 'react';
import { Category, createCategory } from '../utils/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa6';
import queryClient from '../config/queryClient';
import { CATEGORY } from '../hooks/useCategory';

type Props = {
  type: 'post' | 'patch';
  id?: number;
  setVisibleModal: (visible: boolean) => void;
};

const CategoryModal: FC<Props> = ({ type, setVisibleModal }) => {
  const [title, setTitle] = useState<string>('');

  const { mutate: addTitle, isPending } = useMutation({
    mutationFn: createCategory,
    onSuccess: (newCategory) => {
      toast.success('Categoría creada con éxito');
      setVisibleModal(false);
      // queryClient.invalidateQueries({ queryKey: ['category'] });
      queryClient.setQueryData<Category[]>(
        [CATEGORY],
        (old: Category[] | undefined) => {
          return old ? [...old, newCategory] : [newCategory];
        },
      );
    },
    onError: (error) => {
      if (error) {
        if (typeof error.message === 'string') {
          toast.error(error.message);
        } else {
          toast.error(error.message[0]);
        }
      }
    },
  });

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
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              addTitle({ title });
            }}
            disabled={isPending}
            type="submit"
            className="btn btn-green"
          >
            {isPending && <FaSpinner className="animate-spin" />}
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
