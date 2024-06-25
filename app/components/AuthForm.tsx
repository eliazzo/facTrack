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
        <label>username</label>
        <input placeholder="username" name="username" required></input>
        <label>password</label>
        <input placeholder="password" name="password" required></input>
        <button type="submit">{action}</button>
      </form>
    </div>
  )
}

export default AuthForm
