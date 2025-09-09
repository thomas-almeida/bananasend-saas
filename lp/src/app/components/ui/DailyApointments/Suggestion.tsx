interface SuggestionProps {
  suggestion: string
  onSelect?: (text: string) => void
}

export default function Suggestion({ suggestion, onSelect }: SuggestionProps) {
  return (
    <li
      onClick={() => onSelect?.(suggestion)}
      className="p-1 border border-slate-200 rounded list-none px-2 transition-colors cursor-pointer hover:border-[#8f8f8f]"
    >
      {suggestion}
    </li>
  )
}