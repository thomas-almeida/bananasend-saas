// Select.tsx
import { SelectHTMLAttributes } from "react";

type SelectOptions = {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOptions[];
  placeholder?: string;
}

export default function Select({ options, placeholder, ...props }: SelectProps) {
  return (
    <select className="w-full border border-gray-300 p-2 rounded" {...props}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}