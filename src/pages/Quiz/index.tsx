/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

interface ResultDataProps {
  answered: number;
  correct: number;
  incorrect: number;
  score: number;
}

const QuizPage = () => {
  const location = useLocation();

  if (!location.state?.fromApp) {
    return <Navigate to="/" />;
  }

  const [data] = useState(location.state?.fromHome.data);
  const storedUrl = localStorage.getItem("url");
  const storedCurrIndex = localStorage.getItem("currIndex");
  const storedUserAnswers = localStorage.getItem("userAnswers");
  const [timeLeft, setTimeLeft] = useState(
    (localStorage.getItem("url") === location.pathname &&
      localStorage.getItem("timeLeft")) ||
      location.state?.fromHome.time
  );
  const [currIndex, setCurrIndex] = useState(
    (storedUrl === location.pathname &&
      storedCurrIndex !== null &&
      parseInt(storedCurrIndex)) ||
      0
  );

  const [answers, setAnswers] = useState<Array<string>>([]);

  const [userAnswers, setUserAnswers] = useState<Array<string>>(
    (storedUrl === location.pathname &&
      storedUserAnswers !== null &&
      JSON.parse(storedUserAnswers)) ||
      []
  );
  const [status, setStatus] = useState(true);
  const [resultData, setResultData] = useState<ResultDataProps | undefined>(
    undefined
  );

  const shuffle = (array: Array<string>) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }

    const correctCount = userAnswers.filter(
      (answer, index) => answer === data.results[index].correct_answer
    ).length;

    setResultData({
      answered: userAnswers.length,
      correct: correctCount,
      incorrect: data.results.length - correctCount,
      score: (correctCount / data.results.length) * 100,
    });
    setStatus(false);
  }, [timeLeft, status]);

  useEffect(() => {
    const shuffleAnswer = shuffle(
      data.results[currIndex].incorrect_answers.concat(
        data.results[currIndex].correct_answer
      )
    );
    setAnswers(shuffleAnswer);
  }, [currIndex]);

  const handleAnswer = (answer: string) => {
    const getUserAnswer = [...userAnswers, answer];
    setUserAnswers(getUserAnswer);

    if (currIndex + 1 < data.results.length) {
      setCurrIndex(currIndex + 1);
    } else {
      const correctCount = userAnswers.filter(
        (answer, index) => answer === data.results[index].correct_answer
      ).length;

      setResultData({
        answered: userAnswers.length,
        correct: correctCount,
        incorrect: data.results.length - correctCount,
        score: (correctCount / data.results.length) * 100,
      });
      setStatus(false);
      setTimeLeft(0);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (status) {
        localStorage.setItem(
          "data",
          JSON.stringify(location.state?.fromHome.desc)
        );
        localStorage.setItem("timeLeft", timeLeft);
        localStorage.setItem("currIndex", currIndex.toString());
        localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
        localStorage.setItem("status", status.toString());
        localStorage.setItem("url", location.state?.fromHome.url);
      } else {
        localStorage.removeItem("data");
        localStorage.removeItem("timeLeft");
        localStorage.removeItem("currIndex");
        localStorage.removeItem("userAnswers");
        localStorage.removeItem("status");
        localStorage.removeItem("url");
      }
    };

    // handles when page is unloaded
    window.addEventListener("beforeunload", handleBeforeUnload);

    // cleanup function handles when component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);

      handleBeforeUnload();
    };
  });

  const question = data.results[currIndex].question;

  return (
    <main className="flex flex-col py-4 px-10 w-screen h-screen gap-5 bg-[#FBF9F9]">
      <section className="flex justify-between">
        <span className="text-4xl text-[#696F79] font-bold">Quiz Time</span>
        <div className=" bg-[#8692A6] text-white py-3 w-32 h-fit text-center text-xl font-semibold rounded-md">
          {timeLeft === 0 ? "End" : timeLeft}
        </div>
      </section>
      {status ? (
        <section className="flex flex-col w-full grow bg-white rounded-md shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
          <div className="grid grid-cols-autofit gap-1 p-2">
            {Array.from({ length: data.results.length }, (_, index) => (
              <div
                key={index}
                className={` h-2 rounded-full ${
                  index <= currIndex ? "bg-[#8692A6]" : "bg-[#FBF9F9]"
                } `}
              ></div>
            ))}
          </div>
          <div className="grow flex items-center px-3 lg:px-60">
            <p className="text-2xl my-auto font-semibold">
              {decodeURIComponent(question)}
            </p>
          </div>
          <div className="grow p-3 grid grid-cols-[repeat(auto-fit,minmax(40%,1fr))] gap-3">
            {answers.map((answer, i) => {
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(answer)}
                  className="bg-[#8692A6] text-white text-lg rounded-md "
                >
                  {answer}
                </button>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="flex flex-col w-full grow bg-white rounded-md shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] p-5 gap-10 items-center justify-between">
          <h2 className="text-4xl text-[#696F79] font-semibold">Result</h2>

          <div className="grid grid-cols-[repeat(2,minmax(0,200px))] gap-3">
            <div className=" bg-[#8692A6] text-white max-w-52 h-fit p-7 text-center rounded-md space-y-5">
              <h3 className="text-2xl">Answered</h3>
              <span className="block text-4xl">
                {resultData?.answered}/{data.results.length}
              </span>
            </div>
            <div className=" bg-[#8692A6] text-white max-w-52 h-fit p-7 text-center rounded-md space-y-5">
              <h3 className="text-2xl">Correct</h3>
              <span className="block text-4xl">
                {resultData?.correct}/{data.results.length}
              </span>
            </div>
            <div className=" bg-[#8692A6] text-white max-w-52 h-fit p-7 text-center rounded-md space-y-5">
              <h3 className="text-2xl">Incorrect</h3>
              <span className="block text-4xl">
                {resultData?.incorrect}/{data.results.length}
              </span>
            </div>
            <div className=" bg-[#8692A6] text-white max-w-52 h-fit p-7 text-center rounded-md space-y-5">
              <h3 className="text-2xl">Score</h3>
              <span className="block text-4xl">{resultData?.score}</span>
            </div>
          </div>

          <Link
            to={{ pathname: "/" }}
            className="bg-[#8692A6] text-white w-fit h-fit py-3 px-6 rounded-md"
          >
            BACK TO HOME
          </Link>
        </section>
      )}
    </main>
  );
};

export default QuizPage;
