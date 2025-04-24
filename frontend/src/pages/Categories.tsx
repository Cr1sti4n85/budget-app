import { FC, useState } from 'react';
// import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import CategoryModal from '../components/CategoryModal';
import useCategories from '../hooks/useCategory';
import Category from '../components/Category';
// import { useDeleteCategory } from '../hooks/useDeleteCategory';

const Categories: FC = () => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [type, setType] = useState<'post' | 'patch'>('post');

  const { categories } = useCategories();

  return (
    <>
      <div className="mt-10 rounded-md bg-slate-800 p-4">
        <h1>Tu lista de categorías</h1>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {categories?.map((category, idx) => (
            <Category category={category} key={idx} setType={setType} />
          ))}
        </div>

        {/* Add category */}
        <button
          onClick={() => {
            setType('post');
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
        <CategoryModal type={type} setVisibleModal={setVisibleModal} />
      )}
    </>
  );
};

export default Categories;
