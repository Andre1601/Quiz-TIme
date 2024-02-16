type combineCategoryProps = {
  NumQuestions: Array<number>;
  Categories: string;
  Difficulties: Array<string>;
  Types: Array<string>;
  Times: Array<number>;
};

type TempData = [number, string, string, number];

export const combineBasedCategory = ({
  NumQuestions,
  Categories,
  Difficulties,
  Types,
  Times,
}: combineCategoryProps) => {
  const storeArray: {
    img: string;
    desc: {
      "Number of Question": number;
      Category: string;
      Difficulty: string;
      Type: string;
      Time: number;
    };
  }[] = [];

  NumQuestions.forEach((question) => {
    Difficulties.forEach((difficulty) => {
      Types.forEach((type) => {
        Times.forEach((time) => {
          const tempData: TempData = [
            question,
            difficulty === "Any Difficulty" ? "Any" : difficulty,
            type === "Any Type" ? "Any" : type,
            time,
          ];

          storeArray.push({
            img: `https://source.unsplash.com/random/900×700/?${
              Categories === "Any Category" ? "Any" : Categories
            }`,
            desc: {
              "Number of Question": tempData[0],
              Category: Categories === "Any Category" ? "Any" : Categories,
              Difficulty: tempData[1],
              Type: tempData[2],
              Time: tempData[3],
            },
          });
        });
      });
    });
  });

  return storeArray;
};
