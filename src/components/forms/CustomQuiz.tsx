import { useEffect, useState } from "react";
import { categoryList, difficultyList, typeList } from "../../utils/constants";

type DataState = {
  "Number of Question": number | undefined;
  Category: string | undefined;
  Difficulty: string | undefined;
  Type: string | undefined;
  Time: number | undefined;
};

const CustomQuizForm = ({onSubmit}) => {
  const [getData, setData] = useState<DataState>();
  const [number, setNumber] = useState<number>(1);
  const [category, setCategory] = useState<string>('Any Category');
  const [difficult, setDifficult] = useState<string>('Any Difficulty');
  const [type, setType] = useState<string>('Any Type');
  const [time, setTime] = useState<number>(1);

  useEffect(() => {
    setData({
      "Number of Question": number,
      Category: category,
      Difficulty: difficult,
      Type: type,
      Time: time,
    });
  }, [category, difficult, number, time, type]);

  useEffect(() => {
    onSubmit(getData)
  },[getData])

  return (
    <form className="flex flex-col gap-4 text-[#696F79]">
      <label className="flex flex-col gap-2">
        Number of Question
        <input
          type="number"
          className="py-2 px-6 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded"
          onKeyDown={(e) => e.preventDefault()}
          onChange={(e) => setNumber(parseInt(e.target.value))}
          min={1}
          max={50}
        />
      </label>
      <label className="flex flex-col gap-2">
        Select Category
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="py-2 px-6 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-white rounded"
        >
          {categoryList.map((data, index) => (
            <option key={index}>{data}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2">
        Select Difficulty
        <select
          onChange={(e) => setDifficult(e.target.value)}
          className="py-2 px-6 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-white rounded"
        >
          {difficultyList.map((data, index) => (
            <option key={index}>{data}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2">
        Select Type
        <select
          onChange={(e) => setType(e.target.value)}
          className="py-2 px-6 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-white rounded"
        >
          {typeList.map((data, index) => (
            <option key={index}>{data}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2">
        Set Time
        <input
          onChange={(e) => setTime(parseInt(e.target.value))}
          className="py-2 px-6 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded"
          placeholder="second"
        />
      </label>
    </form>
  );
};

export default CustomQuizForm;
