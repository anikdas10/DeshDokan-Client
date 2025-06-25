import UserMenu from "../components/userMenu";
import { IoMdClose } from "react-icons/io";

const UserMenuMobilePage = () => {
    return (
      <section className="bg-white w-full h-full py-6">
        <button onClick={()=>window.history.back()} className="text-neutral-800 block w-fit ml-auto pr-4 cursor-pointer">
          <IoMdClose size={20} />
        </button>
        <div className="container mx-auto px-4 py-5">
          <UserMenu />
        </div>
      </section>
    );
};

export default UserMenuMobilePage;