import { SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <header className="flex justify-between items-center w-full py-4 px-10">
      <span className="text-4xl text-[#696F79] font-bold">Quiz Time</span>
      <section className="flex items-center">
        <SignedOut>
          <Link
            to={{ pathname: "/signin" }}
            className="bg-[#8692A6] w-fit h-fit py-3 px-5 rounded-xl text-lg text-white"
          >
            Sign In
          </Link>
        </SignedOut>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: " w-[45px] h-[45px]",
            },
          }}
        />
      </section>
    </header>
  );
};

export default Topbar;
