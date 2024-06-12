"use client"

type AuthFormProps = {
  onSubmit: (formData: FormData) => Promise<void>
  title: string
  action: string
}

export const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  title,
  action,
}) => {
  return (
    <div className="flex min-h-screen flex-col items-center p-16">
      <h1>{title}</h1>
      <form action={onSubmit}>
        <p>username</p>
        <input placeholder="username" name="username"></input>
        <p>password</p>
        <input placeholder="password" name="password"></input>
        <button type="submit">{action}</button>
      </form>
    </div>
  )
}

export default AuthForm
