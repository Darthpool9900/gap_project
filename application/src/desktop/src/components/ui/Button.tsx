import React from "react";

// Interface base para todos os botões
export interface ButtonBaseProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
}

// Componente base Button seguindo Single Responsibility Principle
export function Button({
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  size = "md",
  variant = "primary",
  ...props
}: ButtonBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-lg hover:shadow-xl",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

// Componentes específicos que herdam do Button base
export const PrimaryButton = (props: Omit<ButtonBaseProps, "variant">) => (
  <Button {...props} variant="primary" />
);

export const SecondaryButton = (props: Omit<ButtonBaseProps, "variant">) => (
  <Button {...props} variant="secondary" />
);

export const OutlineButton = (props: Omit<ButtonBaseProps, "variant">) => (
  <Button {...props} variant="outline" />
);

export const DangerButton = (props: Omit<ButtonBaseProps, "variant">) => (
  <Button {...props} variant="danger" />
);

// Botão de ação flutuante
export const FloatingActionButton = ({
  children,
  onClick,
  className = "",
  ...props
}: ButtonBaseProps) => (
  <Button
    {...props}
    onClick={onClick}
    className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 ${className}`}
    size="lg"
    variant="primary"
  >
    {children}
  </Button>
);
