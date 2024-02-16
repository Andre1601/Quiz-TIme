import { RiHome2Line } from "react-icons/ri";
import { BsGrid1X2 } from "react-icons/bs";
import { MdOutlineDashboardCustomize } from "react-icons/md";

export const sidebarLinks = [
  {
    icon: RiHome2Line,
    route: "/",
    label: "Home",
  },
  {
    icon: BsGrid1X2,
    route: "/category",
    label: "Category",
  },
  {
    icon: MdOutlineDashboardCustomize,
    route: "/custom",
    label: "Custom Quiz",
  },
];

export const quizDataList = [
  {
    img: "src\\assets\\no_quiz.webp",
    desc: ["Difficulty", "Number Question", "Category", "Type", "Time"],
  },
];

export const categoryList = [
  "Any Category",
  "General Knowledge",
  "Entertainment: Books",
  "Entertainment: Film",
  "Entertainment: Music",
  "Entertainment: Musicals & Theatres",
  "Entertainment: Television",
  "Entertainment: Video Games",
  "Entertainment: Board Games",
  "Science & Nature",
  "Science: Computers",
  "Science: Mathematics",
  "Mythology",
  "Sports",
  "Geography",
  "History",
  "Politics",
  "Art",
  "Celebrities",
  "Animals",
  "Vehicles",
  "Entertainment: Comics",
  "Science: Gadgets",
  "Entertainment: Japanese Anime & Manga",
  "Entertainment: Cartoon & Animations",
];

export const difficultyList = ["Any Difficulty", "Easy", "Medium", "Hard"];

export const typeList = ["Any Type", "Multiple Choice", "True / False"];
