import { Link, useNavigate } from "react-router-dom";
import SigninForm from "../../components/forms/Signin";
import { useSignIn } from "@clerk/clerk-react";
import { useState } from "react";
import { OAuthStrategy } from "@clerk/types";

import googleIcon from './../../assets/google_icon.svg'


const SigninPage = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/");
      } else {
        console.log(result);
      }
    } catch (err: unknown) {
      if (
        err instanceof Error &&
        "errors" in err &&
        Array.isArray(err.errors) &&
        err.errors.length > 0
      ) {
        console.error("error", err.errors[0].longMessage);
      } else {
        console.error("Unknown error occurred:", err);
      }
    }
  };

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div>
        <h1 className="text-3xl font-bold">Sign In to Your Account</h1>
        <h2 className="text-lg">with Your Registered Email Address</h2>
        <hr className="my-5" />
        <SigninForm onEmail={setEmailAddress} onPassword={setPassword} />
        <button
          onClick={handleSubmit}
          className="rounded-2xl w-96 py-3 mt-10 text-sm bg-[#8692A6] text-white"
        >
          Sign In
        </button>
        <div className="flex items-center gap-5 my-3">
          <hr className="flex-grow-[1]" />
          <span>or</span>
          <hr className="flex-grow-[1]" />
        </div>
        <button
          onClick={() => signInWith("oauth_google")}
          className="relative flex rounded-2xl w-96 py-3 justify-center items-center text-sm shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
        >
          <img
            src={googleIcon}
            width={24}
            height={24}
            className="absolute left-6"
          />
          <p className="relative">Login with Google</p>
        </button>
        <h2 className="mt-6 ">
          No Account?
          <Link to={{ pathname: "/signup" }} className="text-purple-500 ml-1">
            Sign Up
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default SigninPage;
