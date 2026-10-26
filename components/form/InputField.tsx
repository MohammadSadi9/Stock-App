
import type { UseFormRegister, FieldErrors } from "react-hook-form";

type InputFieldProps = {
  name: keyof SignUpFormData;
  label: string;
  placeholder: string;
  type?: string;
  register: UseFormRegister<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
  options?: { label: string; value: string }[];
};

const InputField = ({
  name,
  label,
  placeholder,
  type = "text",
  register,
  errors,
  options,
}: InputFieldProps) => {
  const inputClass = `w-full rounded-lg border bg-white px-4 py-3
    text-gray-900 placeholder:text-gray-500 outline-none transition
    focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100
    ${errors[name] ? "border-red-500" : "border-gray-300"}`;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-base font-bold text-white"
      >
        {label}
      </label>

      {options ? (
        <select
          id={name}
          defaultValue=""
          {...register(name, {
            required: `${label} is required`,
          })}
          className="w-full cursor-pointer rounded-lg border border-gray-700
            bg-gray-900 px-4 py-3 text-white outline-none transition
            focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
        >
          <option value="" disabled className="bg-gray-900 text-gray-400">
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-gray-900 text-white"
            >
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name, {
            required: `${label} is required`,
          })}
          className={inputClass}
        />
      )}

      {errors[name] && (
        <p className="text-sm text-red-500">
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
};

export default InputField;
