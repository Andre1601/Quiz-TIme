import Bottombar from "../shared/Bottombar";
import LeftSidebar from "../shared/LeftSidebar";
import Topbar from "../shared/Topbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col bg-[#FBF9F9] max-sm:h-dvh h-screen w-screen">
      <Topbar />
      <main className="flex grow">
        <LeftSidebar />
        <div className="bg-white m-[40px_12px_12px_12px] grow rounded-md shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] overflow-hidden ">
          <Outlet />
        </div>
      </main>
      <div className="max-sm:h-[88px] w-full"></div>
      <Bottombar />
    </div>
  );
};

export default MainLayout;
