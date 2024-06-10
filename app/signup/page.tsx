// import { useState } from "react"
// import handler from "../mongodb/models/signup"
import { redirect } from "next/navigation"

export default function SignUp() {
  async function test(formData: FormData) {
    "use server"
    const data = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    }
    console.log(data)
    redirect("/")
  }

  return (
    <main>
      <h1>sign up page</h1>
      <form action={test}>
        <p>username</p>
        <input placeholder="username" name="username"></input>
        <p>password</p>
        <input placeholder="password" name="password"></input>
        <button type="submit">submit</button>
      </form>
    </main>
  )
}
