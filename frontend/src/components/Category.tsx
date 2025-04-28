import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai';
import { CategoryDto } from '../utils/api';
import { FC } from 'react';
import { useDeleteCategory } from '../hooks/useDeleteCategory';

interface CategoryProps {
  category: CategoryDto;
  setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
}

const Category: FC<CategoryProps> = ({
  category,
  setVisibleModal,
  setCategoryId,
}) => {
  const { id, title } = category;
  const { deleteCategory } = useDeleteCategory(id);

  return (
    <div
      className="group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-2"
      //   key={idx}
    >
      {title}
      <div
        className="hidden absolute px-3 left-0 top-0 bottom-0 
          right-0 rounded-lg bg-black/90 items-center justify-between group-hover:flex"
      >
        <button
          onClick={() => {
            setVisibleModal(true);
            setCategoryId(id);
          }}
        >
          <AiFillEdit className="cursor-pointer" />
        </button>
        <form className="flex">
          <input type="hidden" value={id} />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              deleteCategory();
            }}
          >
            <AiFillCloseCircle className="cursor-pointer" />
          </button>
        </form>
      </div>
    </div>
  );
};
export default Category;
