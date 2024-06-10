"use client"
import { useState } from "react"

type AuthFormProps = {
  onsubmit: (formData: FormData) => Promise<void>
}

export const AuthForm: React.FC<AuthFormProps> = (AuthFormProps) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    try {
      await onsubmit(formData)
    } catch (error) {
      console.error
    }
  }
  return (
    <>
      <h1>sign up page</h1>
      <form onSubmit={handleSubmit}>
        <p>username</p>
        <input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <p>password</p>
        <input
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button>submit</button>
      </form>
    </>
  )
}
