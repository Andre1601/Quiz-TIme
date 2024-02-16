import { Outlet, useNavigate } from "react-router-dom";
import arrowPrev from './../../assets/arrow_prev.svg'

const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <main className="flex">
      <section className="w-full h-screen bg-red-500 basis-1/2"></section>
      <section className="flex flex-col w-full h-screen basis-1/2 p-14">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center w-fit gap-3 text-[#8692A6]"
        >
          <img
            src={arrowPrev}
            alt="prev icon button"
            width={9.73}
            height={16.5}
          />
          <p className="leading-none">Back</p>
        </button>
        <Outlet />
      </section>
    </main>
  );
};

export default AuthLayout;
