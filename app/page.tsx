"use client"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

import { Button } from "./components/Button"
import { TranscriptCard } from "./components/TranscriptCard"
import { SelectedTranscript } from "./components/SelectedTranscript"

export default function Home() {
  const router = useRouter()
  const [token, setToken] = useState("")

  useEffect(() => {
    const cookieToken = Cookies.get("token")
    if (cookieToken) setToken(cookieToken)
  }, [])

  const getNotes = () => {
    console.log("this function will call openai/route.ts")
  }

  const logout = () => {
    Cookies.remove("token")
    router.push("/login")
  }

  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-16">
      <div className="flex flex-col">
        <Button text={"Get notes"} onClick={getNotes} />
        <TranscriptCard />
      </div>
      <SelectedTranscript />
      <Button text={"Log out"} onClick={logout} />
    </main>
  )
}
