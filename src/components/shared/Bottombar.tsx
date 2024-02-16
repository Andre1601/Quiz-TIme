import { Link, useLocation } from "react-router-dom";
import { sidebarLinks } from "../../utils/constants";

const Bottombar = () => {
  const pathname = useLocation().pathname;

  return (
    <footer className="bg-[#FBF9F9] flex justify-center gap-3 py-3 fixed bottom-0 w-full sm:hidden">
      {sidebarLinks.map((data, index) => {
        const isActive =
          (pathname.includes(data.route) && data.route.length > 1) ||
          pathname === data.route;
        const label = data.label === "Custom Quiz" ? "Custom" : data.label;

        return (
          <Link
            to={{ pathname: data.route }}
            className={`flex flex-col items-center w-fit p-3 rounded-lg ${
              isActive ? "bg-[#8692A6] text-white" : "text-[#696F79]"
            }`}
            key={index}
          >
            <data.icon />
            <p>{label}</p>
          </Link>
        );
      })}
    </footer>
  );
};

export default Bottombar;
