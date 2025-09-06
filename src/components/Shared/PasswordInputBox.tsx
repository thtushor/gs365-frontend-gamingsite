import { useState } from "react";
import { EyeHideIcon } from "../Icon/EyeHideIcon";
import { EyeShowIcon } from "../Icon/EyeShowIcon";


interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  error?: string;
  required?: boolean;
}

export const PasswordInputBox: React.FC<PasswordInputProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder = "Password",
  minLength = 6,
  maxLength = 20,
  error,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex items-center">
      {/* Left icon */}
      <i className="icon-password absolute left-3 text-yellow-400 text-lg" />

      {/* Password Input */}
      <input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="
          w-full 
          rounded-md 
          border border-yellow-400/20 
          bg-yellow-400/5 
          px-10 py-3 
          text-sm text-white 
          placeholder:text-yellow-400/40 
          transition 
          focus:border-yellow-400 
          focus:ring-2 focus:ring-yellow-400/20 
          focus:outline-none
        "
      />

      {/* Eye toggle */}
      <div
        className="absolute right-3 flex h-6 w-6 cursor-pointer items-center justify-center text-yellow-400 transition hover:text-yellow-300"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <EyeHideIcon /> : <EyeShowIcon />}
      </div>

      {/* Error Message */}
      {error && (
        <div className="absolute -bottom-6 left-0 text-xs text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};
