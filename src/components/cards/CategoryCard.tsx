import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }: { category: string }) => {
  const navigate = useNavigate();

  const redirectHandle = () => {
    navigate(`/detail/${category.split(" ").join("").toLowerCase()}`, {
      state: { fromCategory: { category } },
    });
  };

  return (
    <button
      onClick={redirectHandle}
      className="relative max-h-40 max-w-72 rounded-xl overflow-hidden"
    >
      <img
        src={`https://source.unsplash.com/random/900×700/?${category}`}
        className=""
      />
      <p className="absolute text-white text-lg bottom-3 left-4 font-bold">
        {category}
      </p>
    </button>
  );
};

export default CategoryCard;
