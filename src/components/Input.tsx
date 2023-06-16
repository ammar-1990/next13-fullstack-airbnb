import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  id: string;
  type: string;
  label: string;
  disabled: boolean;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

const Input = ({
  id,
  type,
  label,
  disabled,
  required,
  register,
  errors,
}: Props) => {
  return (
    <div className="relative  ">
      <input
        type={type}
        {...register(id, { required: required })}
        className={`peer  w-full p-3 py-4 border-neutral-300 rounded-lg border-2 text-sm  disabled:opacity-70 disabled:cursor-not-allowed  outline-none duration-300 ${
          errors[id] && "border-rose-500 focus:border-rose-500"
        } focus:border-black `}
        autoComplete="off"
        placeholder=" "
      />
      <label
        className={`duration-300
         text-md
          text-gray-400
          cursor-text
          pointer-events-none
           capitalize
         top-4
         scale-75
              -translate-y-4
             origin-[0]
              absolute left-3
              peer-placeholder-shown:translate-y-0
              peer-placeholder-shown:scale-100
                 peer-focus:scale-75
                  peer-focus:-translate-y-4
                   ${
          errors[id] && "text-rose-500"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
