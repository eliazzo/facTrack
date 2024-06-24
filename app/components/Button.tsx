"use client"

type ButtonProps = {
  text: string
  onClick: any
  className: string
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  return (
    <button className={className} onClick={onClick}>
      <p>{text}</p>
    </button>
  )
}
