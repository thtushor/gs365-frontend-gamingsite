import React, { useState } from "react";
import { EyeShowIcon } from "../Icon/EyeShowIcon";
import { EyeHideIcon } from "../Icon/EyeHideIcon";
import "./AuthInput.scss";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    labelClassName?: string;
    wrapperClassName?: string;
    containerClassName?: string;
    iconClass?: string;
    icon?: React.ReactNode;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    error?: string;
    as?: keyof JSX.IntrinsicElements;
    children?: React.ReactNode;
}

const AuthInput: React.FC<AuthInputProps> = ({
    label,
    labelClassName = "",
    wrapperClassName = "",
    containerClassName = "",
    iconClass,
    icon,
    startAdornment,
    endAdornment,
    error,
    type = "text",
    className = "",
    style,
    as: Component = "div",
    children,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    const hasStartAdornment = !!startAdornment || !!iconClass || !!icon;
    const hasEndAdornment = !!endAdornment || isPassword;

    return (
        <Component className={`auth-input-wrapper ${wrapperClassName}`}>
            {label && (
                <label className={`auth-input-label ${labelClassName}`}>
                    {label}
                </label>
            )}
            <div className={`input-icon-type ${containerClassName}`}>
                {iconClass && <i className={iconClass}></i>}
                {icon && <div className="start-adornment">{icon}</div>}
                {startAdornment && <div className="start-adornment">{startAdornment}</div>}

                {children ? (
                    children
                ) : (
                    <input
                        className={`auth-input-field ${error ? "error" : ""} ${className}`}
                        style={{
                            paddingLeft: hasStartAdornment ? "40px" : "12px",
                            paddingRight: hasEndAdornment ? "40px" : "12px",
                            ...style
                        }}
                        type={inputType}
                        {...props}
                    />
                )}

                {endAdornment && <div className="end-adornment">{endAdornment}</div>}

                {isPassword && (
                    <div
                        className="eyes"
                        onClick={() => setShowPassword((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                    >
                        {showPassword ? <EyeHideIcon /> : <EyeShowIcon />}
                    </div>
                )}
            </div>
            {error && <div className="error-message">{error}</div>}
        </Component>
    );
};

export default AuthInput;
