"use client"
import { Button } from "./components/Button"
import { handleClick } from "./mongodb/temporaryHandleClick"
import { TranscriptCard } from "./components/TranscriptCard"
import { SelectedTranscript } from "./components/SelectedTranscript"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
// import { cookies } from "next/headers"

export default function Home() {
  const [token, setToken] = useState("")
  useEffect(() => {
    console.log("homepage")
    const cookie = Cookies.get("token")
    if (cookie) setToken(cookie)
    console.log("homepage cookie: ", token)
  }, [token])
  // console.log("homepage cookie: ", cookies().has("token"))
  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-16">
      <div className="flex flex-col">
        <Button text={""} onClick={handleClick} />
        <TranscriptCard />
      </div>
      <SelectedTranscript />
    </main>
  )
}
