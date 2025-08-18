import React from "react";

interface DefaultInputProps {
  type: string;
  Value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function DefaultInput({
  type,
  Value,
  onChange,
  placeholder,
}: DefaultInputProps) {
  return (
    <input
      type={type}
      value={Value}
      onChange={onChange}
      placeholder={placeholder}
      className="appearance-none w-full p-2 bg-Snow text-base rounded-lg border-0 shadow_ef"
    />
  );
}
