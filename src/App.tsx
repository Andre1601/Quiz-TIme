import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import CategoryPage from "./pages/Category";
import CustomQuizPage from "./pages/CustomQuiz";
import SigninPage from "./pages/Signin";
import SignupPage from "./pages/Signup";
import MainLayout from "./components/layouts/MainLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import SSOCallback from "./pages/OAuth";
import { useSession } from "@clerk/clerk-react";
import QuizPage from "./pages/Quiz";
import { useEffect } from "react";
import DetailCategoryPage from "./pages/Detail";

const App: React.FC = () => {
  const { session } = useSession();

  if (session !== localStorage.getItem("session")) {
    localStorage.setItem("session", session as unknown as string);
  }

  useEffect(() => {
    !session &&
      localStorage.getItem("session") &&
      localStorage.removeItem("session");
  }, [session]);

  if (localStorage.getItem("session")) {
    return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/*" element={<HomePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/detail/:category" element={<DetailCategoryPage />} />
          <Route path="/custom" element={<CustomQuizPage />} />
        </Route>
        <Route path="/quiz/:id" element={<QuizPage />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/*" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route path="/sso-callback" element={<SSOCallback />} />
    </Routes>
  );
};

export default App;
