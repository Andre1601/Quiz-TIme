type EmailOTPFormProps = {
  onValues: (index: number, value: string) => void;
};

const EmailOTPForm = ({ onValues }: EmailOTPFormProps) => {
  return (
    <form className="grid grid-cols-6 gap-4">
      {Array.from({ length: 6 }, (_, index) => (
        <input
          onKeyDown={(e) => {
            (e.code < "Digit0" || e.code > "Digit9") && e.preventDefault();
          }}
          onKeyUp={(e) => {
            (e.target as HTMLInputElement).value.length === 1 &&
              ((e.target as HTMLInputElement).nextElementSibling as HTMLInputElement)?.focus();
          }}
          onChange={(e) => onValues(index, e.target.value)}
          maxLength={1}
          className="border-[3px] border-solid text-3xl text-[#696F79] p-5 text-center rounded-md"
          key={index}
        />
      ))}
    </form>
  );
};

export default EmailOTPForm;
