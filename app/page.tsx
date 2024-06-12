"use client"
import Cookies from "js-cookie"
import { Button } from "./components/Button"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const { TranscriptCard } = require("./components/TranscriptCard")
const { SelectedTranscript } = require("./components/SelectedTranscript")

export default function Home() {
  const router = useRouter()
  const [token, setToken] = useState<string | undefined>(undefined)

  const getNotes = () => {
    console.log("this function will get the meeting notes from the database")
  }

  const logout = () => {
    Cookies.remove("token")
    router.push("/login")
  }

  useEffect(() => {
    const cookieToken = Cookies.get("token")
    setToken(cookieToken || undefined)
  }, [])

  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-16">
      <div className="flex flex-col">
        <Button text={"Get meeting notes"} handleClick={getNotes} />
        <TranscriptCard />
      </div>
      <SelectedTranscript />
      <Button text={"Log out"} handleClick={logout} />
    </main>
  )
}
