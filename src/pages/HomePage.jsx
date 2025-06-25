import { useSelector } from "react-redux";
import Banner from "../components/Banner";
import DisplayCategoryProduct from "../components/DisplayCategoryProduct";
import ShopByCategory from "../components/ShopByCategory";

const HomePage = () => {
    const { allCategory, categoryLoading } = useSelector(
      (state) => state.product
    );
    return (
      <section className="container mx-auto">
        {/* banner */}
        <Banner />
        <ShopByCategory />

        {categoryLoading ? (
          <></>
        ) : (
          allCategory?.map((c, index) => {
            return (
              <DisplayCategoryProduct key={index} id={c._id} name={c.name} />
            );
          })
        )}
      </section>
    );
};

export default HomePage;