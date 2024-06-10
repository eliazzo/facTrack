// import { useState } from "react"
// import handler from "../mongodb/models/signup"
import { redirect } from "next/navigation"
import { AuthForm } from "../components/authForm"

export default function SignUp() {
  async function test(formData: FormData) {
    "use server"
    const data = {
      user: formData.get("user") as string,
    }
    console.log(data)
    redirect("/")
  }

  return <AuthForm onsubmit={test} />
}
