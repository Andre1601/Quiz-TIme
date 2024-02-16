import { useNavigate } from "react-router-dom";
import { categoryList } from "../../utils/constants";

interface DataDesc {
  "Number of Question": number;
  Category: string;
  Difficulty: string;
  Type: string;
  Time: number;
}

interface Data {
  img: string;
  desc: DataDesc;
}

interface DataListProps {
  datas: Data[];
}

type fetchDataProps = {
  amount: number;
  category: string;
  difficulty: string;
  type: string;
  time: number;
};

const QuizCard = ({ datas }: DataListProps) => {
  const navigate = useNavigate();

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
    const data = await response.json();
    const desc = {
      "Number Question": amount,
      Category: category,
      Difficulty: difficulty,
      Type: type,
      Time: time,
    };
    const url = "/quiz/" + btoa(category + difficulty + type + time);
    navigate(url, {
      state: { fromApp: true, fromHome: { data, time, desc, url } },
    });
  };

  const formatTime = (time: string | number): string => {
    if (typeof time === "number") {
      return `${time} Second`;
    } else {
      return time;
    }
  };

  return (
    <>
      {datas.slice(0, 3).map((data, index) => {
        return (
          <button
            key={index}
            onClick={() =>
              fetchData({
                amount: data.desc["Number of Question"],
                category: data.desc.Category,
                difficulty: data.desc.Difficulty,
                type: data.desc.Type,
                time: data.desc.Time,
              })
            }
            className="flex h-fit gap-5 items-center shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-lg overflow-hidden"
          >
            <img src={data.img} className="h-40 w-40" />
            <div className="text-start w-full">
              {Object.keys(data.desc).map((key, i) => {
                return (
                  <div className="flex text-[#696F79]" key={i}>
                    <span className="basis-6/12">{key}</span>
                    <span>
                      :{" "}
                      {key === "Time"
                        ? formatTime(data.desc[key as keyof DataDesc])
                        : data.desc[key as keyof DataDesc]}
                    </span>
                  </div>
                );
              })}
            </div>
          </button>
        );
      })}
    </>
  );
};

export default QuizCard;
