import { Outlet } from "react-router";
import UserMenu from "../components/userMenu";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
    return (
      <section className="bg-white">
        <div className="container mx-auto p-3 flex  gap-4 relative">
          {/* left for the menu */}
          <div>
            <Sidebar />
          </div>

          {/* right for the content */}
          <div className=" w-full bg-white min-h-[75vh]">
            <Outlet />
          </div>
        </div>
      </section>
    );
};

export default Dashboard;