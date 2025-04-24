import { FC, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CategoryModal from '../components/CategoryModal';
import useCategories from '../hooks/useCategory';
import Category from '../components/Category';

const Categories: FC = () => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>('');

  const { categories } = useCategories();

  return (
    <>
      <div className="mt-10 rounded-md bg-slate-800 p-4">
        <h1>Tu lista de categorías</h1>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {categories?.map((category, idx) => (
            <Category
              category={category}
              key={idx}
              setVisibleModal={setVisibleModal}
              setCategoryId={setCategoryId}
            />
          ))}
        </div>

        {/* Add category */}
        <button
          onClick={() => {
            setVisibleModal(!visibleModal);
          }}
          className="mt-5 flex max-w-fit items-center gap-2
       text-white/50 hover:text-white cursor-pointer"
        >
          <FaPlus />
          <span>Crear nueva categoría</span>
        </button>
      </div>

      {/* Create Modal */}
      {visibleModal && (
        <CategoryModal
          id={categoryId}
          setCategoryId={setCategoryId}
          setVisibleModal={setVisibleModal}
        />
      )}
    </>
  );
};

export default Categories;
