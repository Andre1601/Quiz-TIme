import { useSignUp } from "@clerk/clerk-react";
import SignoutForm from "../../components/forms/Signout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailOTPForm from "../../components/forms/EmailOTP";

const SignupPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [inputValues, setInputValues] = useState(Array(6).fill(""));
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  // start the sign up process.
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  useEffect(() => {
    const allCode = inputValues.join('')
    setCode(allCode)
  }, [inputValues]);

  // This verifies the user using email code that is delivered.
  const onPressVerify = async (e: { preventDefault: () => void; }) => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        navigate("/");
      }
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      {!pendingVerification ? (
        <div>
          <h1 className="text-3xl font-bold text-[#696F79]">
            Create your account
          </h1>
          <h2 className="text-lg text-[#696F79]">to continue to Quiz Time</h2>
          <hr className="my-5" />
          <SignoutForm onEmail={setEmailAddress} onPassword={setPassword} />
          <button
            onClick={handleSubmit}
            className="rounded-2xl w-96 py-3 mt-10 text-sm bg-[#8692A6] text-white"
          >
            Sign Up
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#696F79]">
            Final Step: Verify Your Email
          </h2>
          <h3 className="text-lg mb-20 text-[#696F79]">
            Please check your email and enter the OTP code to proceed.
          </h3>
          <EmailOTPForm onValues={handleInputChange} />
          <button onClick={onPressVerify} className="bg-[#8692A6] py-3 px-7 text-lg text-white font-semibold rounded-md mt-40">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
