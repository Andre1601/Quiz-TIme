import { useNavigate } from "react-router-dom";
import QuizCard from "../../components/cards/QuizCard";
import { categoryList, difficultyList, typeList } from "../../utils/constants";
import { combineBasedCategory } from "../../utils/generateQuiz";

import noQuizImage from "../../assets/no_quiz.webp";

type fetchDataProps = {
  amount: number;
  category: string;
  difficulty: string;
  type: string;
  time: number;
};

const HomePage = () => {
  const setQuestions = [20];
  const setTimes = [10];
  const storedData = localStorage.getItem("data");
  const getUnloadData = storedData !== null ? JSON.parse(storedData) : null;
  const navigate = useNavigate();

  const allData = combineBasedCategory({
    Categories: categoryList[0],
    Difficulties: difficultyList,
    NumQuestions: setQuestions,
    Times: setTimes,
    Types: typeList,
  });

  const fetchData = async ({
    amount,
    category,
    difficulty,
    type,
    time,
  }: fetchDataProps) => {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${
        category === "Any" ? "" : categoryList.indexOf(category) + 8
      }&difficulty=${
        difficulty === "Any" ? "" : difficulty.toLowerCase()
      }&type=${
        type === "Multiple Choice"
          ? "multiple"
          : type === "True / False"
          ? "boolean"
          : type === "Any"
          ? ""
          : type
      }`
    );
    const desc = {
      "Number Question": amount,
      Category: category,
      Difficulty: difficulty,
      Type: type,
      Time: time,
    };
    const data = await response.json();

    const url = localStorage.getItem("url");
    if (url) {
      navigate(url, {
        state: { fromApp: true, fromHome: { data, time, desc, url } },
      });
    }
  };

  const handleContinueQuiz = () => {
    fetchData({
      amount: getUnloadData["Number Question"],
      category: getUnloadData["Category"],
      difficulty: getUnloadData["Difficulty"],
      type: getUnloadData["Type"],
      time: getUnloadData["TIme"],
    });
  };

  return (
    <div className="flex flex-col h-full">
      {getUnloadData != null ? (
        <section className="flex justify-center items-center basis-1/2 gap-10 p-3">
          <img src={noQuizImage} className="max-w-52 max-h-52 rounded-md" />
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-[#696F79]">
              Pause Quiz - Remember to Resume
            </h2>
            {Object.keys(getUnloadData).map((data, index) => (
              <div className="flex text-[#696F79]" key={index}>
                <span className="basis-1/3">{data}</span>
                <span>: {getUnloadData[data]}</span>
              </div>
            ))}
            <button
              onClick={() => handleContinueQuiz()}
              className="bg-[#8692A6] text-white font-semibold mt-5 py-3 w-full rounded-xl "
            >
              Back to Quiz
            </button>
          </div>
        </section>
      ) : (
        <section className="flex justify-center items-center basis-1/2 gap-10 p-3">
          <img
            src={noQuizImage}
            className="max-w-52 max-h-52 rounded-md"
          />
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-[#696F79]">
              No Quizzes Currently in Progress
            </h2>
            <button className="bg-[#8692A6] text-white font-semibold mt-5 py-3 w-full rounded-xl ">
              Try Quiz
            </button>
          </div>
        </section>
      )}
      <section className=" basis-1/2 p-5">
        <h2 className="text-[#696F79] font-semibold">Try Suggested Quiz</h2>

        {/* Container Card */}
        <div className="grid grid-cols-3 gap-4 mt-3">
          <QuizCard datas={allData} />
        </div>
      </section>
      <div className="max-sm:h-[88px] w-full bg-[#FBF9F9]"></div>
    </div>
  );
};

export default HomePage;
