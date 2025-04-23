import { FC, useState } from 'react';
import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { Form } from 'react-router';
import CategoryModal from '../components/CategoryModal';

const Categories: FC = () => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  return (
    <>
      <div className="mt-10 rounded-md bg-slate-800 p-4">
        <h1>Tu lista de categorías</h1>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <div className="group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-2">
            Sueldo
            <div
              className="hidden absolute px-3 left-0 top-0 bottom-0 
          right-0 rounded-lg bg-black/90 items-center justify-between group-hover:flex"
            >
              <button>
                <AiFillEdit className="cursor-pointer" />
              </button>
              <Form className="flex" method="delete" action="/category">
                <input type="hidden" value={'Category ID'} />
                <button type="submit" className="">
                  <AiFillCloseCircle className="cursor-pointer" />
                </button>
              </Form>
            </div>
          </div>
        </div>

        {/* Add category */}
        <button
          onClick={() => setVisibleModal(!visibleModal)}
          className="mt-5 flex max-w-fit items-center gap-2
       text-white/50 hover:text-white cursor-pointer"
        >
          <FaPlus />
          <span>Crear nueva categoría</span>
        </button>
      </div>

      {/* Create Modal */}
      {visibleModal && (
        <CategoryModal type="post" id={1} setVisibleModal={setVisibleModal} />
      )}
    </>
  );
};

export default Categories;
