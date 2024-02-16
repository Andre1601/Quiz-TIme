import { useLocation } from "react-router-dom";
import QuizCard from "../../components/cards/QuizCard";
import { difficultyList, typeList } from "../../utils/constants";
import { combineBasedCategory } from "../../utils/generateQuiz";

const DetailCategoryPage = () => {
  const location = useLocation();
  const setQuestions = [20];
  const setTimes = [10];
  const { fromCategory } = location.state;

  const allData = combineBasedCategory({
    Categories: fromCategory.category,
    Difficulties: difficultyList,
    NumQuestions: setQuestions,
    Times: setTimes,
    Types: typeList,
  });

  return (
    <div className="p-8">
      <h2 className="text-2xl text-[#696F79] font-semibold">Select Topic</h2>
      <h3 className="text-[#696F79]">Featured Category</h3>
      <div className="grid grid-cols-3 gap-4 mt-3">
        <QuizCard datas={allData} />
      </div>
    </div>
  );
};

export default DetailCategoryPage;
