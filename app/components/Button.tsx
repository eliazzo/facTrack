"use client"

type ButtonProps = {
  text: string
  handleClick: () => void
}

export const Button: React.FC<ButtonProps> = ({ text, handleClick }) => {
  return (
    <button
      className="border-solid border-2 border-black h-10 px-4"
      onClick={handleClick}
    >
      <h2>{text}</h2>
    </button>
  )
}
