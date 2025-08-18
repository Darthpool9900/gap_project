import React from "react";

// Interface base para todos os cards
export interface CardBaseProps {
  children?: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  border?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

// Componente base Card seguindo Single Responsibility Principle
export function Card({
  children,
  className = "",
  padding = "md",
  shadow = "md",
  border = true,
  hover = false,
  onClick,
  ...props
}: CardBaseProps & React.HTMLAttributes<HTMLDivElement>) {
  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-6",
    lg: "p-8"
  };
  
  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl"
  };

  const borderClasses = border ? "border border-gray-200" : "";
  const hoverClasses = hover ? "transition-all duration-200 hover:shadow-lg hover:-translate-y-1" : "";
  const clickableClasses = onClick ? "cursor-pointer" : "";

  const classes = `bg-white rounded-xl ${paddingClasses[padding]} ${shadowClasses[shadow]} ${borderClasses} ${hoverClasses} ${clickableClasses} ${className}`;

  return (
    <div
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

// Cards específicos que herdam do Card base
export const ProfileCard = ({
  avatar,
  name,
  email,
  role,
  className = "",
  ...props
}: CardBaseProps & {
  avatar?: string;
  name: string;
  email: string;
  role?: string;
}) => (
  <Card {...props} className={`text-center ${className}`}>
    <div className="space-y-3">
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className="w-16 h-16 rounded-full mx-auto border-4 border-gray-200"
        />
      ) : (
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto flex items-center justify-center text-white text-xl font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">{email}</p>
        {role && <p className="text-xs text-gray-500 mt-1">{role}</p>}
      </div>
    </div>
  </Card>
);

export const AgentCard = ({
  name,
  description,
  price,
  code,
  image,
  onSelect,
  className = "",
  ...props
}: CardBaseProps & {
  name: string;
  description: string;
  price?: string;
  code: string;
  image?: string;
  onSelect?: (code: string) => void;
}) => (
  <Card
    {...props}
    hover
    onClick={() => onSelect?.(code)}
    className={`max-w-sm ${className}`}
  >
    <div className="space-y-4">
      {image && (
        <img
          src={image}
          alt={name}
          className="w-full h-32 object-cover rounded-lg"
        />
      )}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        {price && (
          <p className="text-sm font-medium text-blue-600">{price}</p>
        )}
      </div>
    </div>
  </Card>
);

export const InfoCard = ({
  icon,
  title,
  description,
  className = "",
  ...props
}: CardBaseProps & {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Card {...props} className={`text-center ${className}`}>
    <div className="space-y-3">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
        <div className="w-6 h-6 text-blue-600">{icon}</div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </Card>
);

export const StatsCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  className = "",
  ...props
}: CardBaseProps & {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}) => {
  const changeColor = {
    positive: "text-green-600",
    negative: "text-red-600",
    neutral: "text-gray-600"
  };

  return (
    <Card {...props} className={className}>
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change && (
          <p className={`text-sm ${changeColor[changeType]}`}>
            {change}
          </p>
        )}
      </div>
    </Card>
  );
};
