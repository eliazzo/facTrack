"use client"

type ButtonProps = {
  text: string
  onClick: any
}

export const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="border-solid border-2 border-black h-10 px-4"
      onClick={onClick}
    >
      <h2>{text}</h2>
    </button>
  )
}
