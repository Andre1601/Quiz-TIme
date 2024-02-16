import { Link, useLocation } from "react-router-dom";
import { sidebarLinks } from "../../utils/constants";
import {
  SignOutButton,
  SignedIn,
} from "@clerk/clerk-react";

import { AiOutlineLogout } from "react-icons/ai";

const LeftSidebar = () => {
  const pathname = useLocation().pathname;

  return (
    <aside className="flex flex-col justify-between w-fit px-5 py-10 max-sm:hidden">
      <div className="space-y-3">
        {sidebarLinks.map((data, index) => {
          const isActive =
            (pathname.includes(data.route) && data.route.length > 1) ||
            pathname === data.route;
          return (
            <Link
              to={{ pathname: data.route }}
              className={`py-3 px-5 flex gap-3 items-center rounded-md ${
                isActive ? "bg-[#8692A6] text-white" : "text-[#696F79]"
              }`}
              key={index}
            >
              <data.icon className="w-7 h-7" />
              <p className="text-base font-semibold max-xl:hidden">
                {data.label}
              </p>
            </Link>
          );
        })}
      </div>
      <SignedIn>
        <SignOutButton signOutCallback={() => window.location.reload()}>
          <div className="py-3 px-5 flex gap-3 items-center text-[#696F79] cursor-pointer">
            <AiOutlineLogout className="w-7 h-7" />
            <p className="text-base font-semibold max-xl:hidden">Sign Out</p>
          </div>
        </SignOutButton>
      </SignedIn>
    </aside>
  );
};

export default LeftSidebar;
