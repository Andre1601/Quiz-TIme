import { useNavigate } from "react-router-dom";
import CustomQuizForm from "../../components/forms/CustomQuiz";
import { categoryList } from "../../utils/constants";
import { useState } from "react";

type fetchDataProps = {
  amount: number;
  category: string;
  difficulty: string;
  type: string;
  time: number;
};

const CustomQuizPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();

  const fetchData = async ({
    amount,
    category,
    difficulty,
    type,
    time,
  }: fetchDataProps) => {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${
        category === "Any Category" ? "" : categoryList.indexOf(category) + 8
      }&difficulty=${
        difficulty === "Any Difficulty" ? "" : difficulty.toLowerCase()
      }&type=${
        type === "Multiple Choice"
          ? "multiple"
          : type === "True / False"
          ? "boolean"
          : type === "Any Type"
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
    const url =
      "/quiz/" + btoa(category + difficulty + type + time);
    navigate(url, {
      state: { fromApp: true, fromHome: { data, time, desc, url } },
    });
  };

  const handleData = (data) => {
    setData(data);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center ">
      <h2 className="text-3xl text-[#696F79] font-semibold mb-8">
        Custom your own quiz
      </h2>
      <CustomQuizForm onSubmit={handleData} />
      <button
        onClick={() =>
          fetchData({
            amount: data?.["Number of Question"],
            category: data?.Category,
            difficulty: data?.Difficulty,
            type: data?.Type,
            time: data?.Time,
          })
        }
        className=" bg-[#8692A6] text-white font-semibold py-2 px-16 mt-6 rounded"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default CustomQuizPage;
