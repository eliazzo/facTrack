"use client"

type ButtonProps = {
  text: string
  onClick: any
  className: string
}

export const InstructionButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  className,
}) => {
  return (
    <button className={className} onClick={onClick}>
      <h2>{text}</h2>
    </button>
  )
}
