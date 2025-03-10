import usePasswordToggle from "../hooks/usePasswordToggle";

const Input = ({ label, type, ...props }) => {
  const [inputType, Icon] = usePasswordToggle();
  const isPassword = type === "password";

  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-sm/6 font-medium text-gray-900" htmlFor={props.id} >{label}</label>
      )}
      <div className="relative mt-2">
        <input
          type={isPassword ? inputType : type}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          {...props}
          autoComplete="new-password"
        />
        {isPassword && (
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {Icon}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
