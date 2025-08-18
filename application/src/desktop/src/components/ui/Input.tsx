import React, { forwardRef } from "react";

// Interface base para todos os inputs
export interface InputBaseProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: "text" | "email" | "password" | "number" | "search";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled";
  error?: boolean;
  errorMessage?: string;
  label?: string;
  required?: boolean;
}

// Componente base Input seguindo Single Responsibility Principle
export const Input = forwardRef<HTMLInputElement, InputBaseProps & React.InputHTMLAttributes<HTMLInputElement>>(({
  value,
  onChange,
  placeholder,
  disabled = false,
  type = "text",
  size = "md",
  variant = "default",
  error = false,
  errorMessage,
  label,
  required = false,
  className = "",
  ...props
}, ref) => {
  const baseClasses = "w-full rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg"
  };
  
  const variantClasses = {
    default: "border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500",
    outline: "border-2 border-gray-300 bg-transparent text-gray-900 focus:border-blue-500 focus:ring-blue-500",
    filled: "border-transparent bg-gray-100 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-blue-500"
  };

  const errorClasses = error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "";

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${errorClasses} ${className}`;

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={classes}
        {...props}
      />
      {error && errorMessage && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

// Componentes específicos que herdam do Input base
export const TextInput = forwardRef<HTMLInputElement, Omit<InputBaseProps, "type">>((props, ref) => (
  <Input {...props} ref={ref} type="text" />
));

export const EmailInput = forwardRef<HTMLInputElement, Omit<InputBaseProps, "type">>((props, ref) => (
  <Input {...props} ref={ref} type="email" />
));

export const PasswordInput = forwardRef<HTMLInputElement, Omit<InputBaseProps, "type">>((props, ref) => (
  <Input {...props} ref={ref} type="password" />
));

export const SearchInput = forwardRef<HTMLInputElement, Omit<InputBaseProps, "type">>((props, ref) => (
  <Input {...props} ref={ref} type="search" />
));

// Input com ícone
export const InputWithIcon = forwardRef<HTMLInputElement, InputBaseProps & {
  icon: React.ReactNode;
  iconPosition?: "left" | "right";
}>(({
  icon,
  iconPosition = "left",
  ...props
}, ref) => (
  <div className="relative">
    {iconPosition === "left" && (
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <div className="h-5 w-5 text-gray-400">{icon}</div>
      </div>
    )}
    <Input
      {...props}
      ref={ref}
      className={`${iconPosition === "left" ? "pl-10" : "pr-10"} ${props.className || ""}`}
    />
    {iconPosition === "right" && (
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <div className="h-5 w-5 text-gray-400">{icon}</div>
      </div>
    )}
  </div>
));

InputWithIcon.displayName = "InputWithIcon";
TextInput.displayName = "TextInput";
EmailInput.displayName = "EmailInput";
PasswordInput.displayName = "PasswordInput";
SearchInput.displayName = "SearchInput";
