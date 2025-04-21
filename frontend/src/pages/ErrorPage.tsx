import { FC } from 'react';
import img from '../assets/img/page_not_found.png';
import { Link } from 'react-router';

const ErrorPage: FC = () => {
  return (
    <div
      className="min-h-screen bg-slate-900 text-white
  flex justify-center items-center flex-col gap-10"
    >
      <img src={img} alt="not found error image" className="w-70 px-4" />
      <Link
        to="/"
        className="bg-red-900 rounded-md px-6 py-2 hover:bg-red-900/70"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
