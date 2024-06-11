"use client"

type AuthFormProps = {
  onSubmit: any // needs to be replaced with onSubmit return value
}
//@ts-ignore
export default function AuthForm<AuthFormProps>({ onSubmit }) {
  return (
    <div className="flex min-h-screen flex-col items-center p-16">
      <h1>login page</h1>
      <form action={onSubmit}>
        <p>username</p>
        <input placeholder="username" name="username"></input>
        <p>password</p>
        <input placeholder="password" name="password"></input>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
