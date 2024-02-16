type SigninFormProps = {
  onPassword: (password: string) => void;
  onEmail: (email: string) => void;
};

const SigninForm = ({ onPassword, onEmail }: SigninFormProps) => {

  return (
    <form className="space-y-4">
      <label className="flex flex-col">
        Email
        <input
          type="email"
          className="rounded-2xl w-96 mt-2 py-3 px-6 text-sm shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
          placeholder="Email (e.g., your@email.com)"
          onChange={(e) => onEmail(e.target.value)}
        />
      </label>
      <label className="flex flex-col">
        Password
        <input
          type="password"
          className="rounded-2xl w-96 mt-2 py-3 px-6 text-sm shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
          placeholder="Password"
          onChange={(e) => onPassword(e.target.value)}
        />
      </label>
    </form>
  );
};

export default SigninForm;
