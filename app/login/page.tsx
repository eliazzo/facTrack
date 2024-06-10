"use client"
import { useState } from "react"
import { redirect } from "next/navigation"

export default function SignUp() {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <h1>login page</h1>
      <form>
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
    </main>
  )
}
