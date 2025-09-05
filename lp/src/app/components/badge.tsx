
interface BadgeProps {
  text: string
  bgColor: string
  textColor: string
}

export default function Badge({ text, bgColor, textColor }: BadgeProps) {
  return (
    <>
      <b
        className="mt-5 text-sm sm:text-md max-w-2xl mx-auto leading-5 px-2.5 py-1 rounded-full shadow-lg shadow-slate-100 border border-slate-200 font-medium"
        style={{
          backgroundColor: bgColor,
          color: textColor
        }}
      >
        {text}
      </b>
    </>
  )
}