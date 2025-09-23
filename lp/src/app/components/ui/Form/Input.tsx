interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
}

export default function Input({ type = "text", placeholder, ...props }: InputProps) {
  return (
    <input
      className="border border-gray-300 rounded px-3 py-2 w-full"
      type={type}
      placeholder={placeholder}
      {...props}
    />
  )
}