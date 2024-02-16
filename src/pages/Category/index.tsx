import CategoryCard from "../../components/cards/CategoryCard";
import { categoryList } from "../../utils/constants";

const CategoryPage = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl text-[#696F79] font-semibold">Select Topic</h2>
      <h3 className="text-[#696F79]">Featured Category</h3>
      <div className="grid grid-cols-4 gap-4 mt-8">
        {categoryList.slice(1, 7).map((data, index) => {
          return <CategoryCard category={data} key={index} />;
        })}
      </div>
    </div>
  );
};

export default CategoryPage;
