"use client"

type ButtonProps = {
  text: string
  onClick: any
  className: string
  dataTestId: string
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className,
  dataTestId,
}) => {
  return (
    <button className={className} onClick={onClick} data-testid={dataTestId}>
      <p>{text}</p>
    </button>
  )
}
