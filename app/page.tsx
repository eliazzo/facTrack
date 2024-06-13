"use client"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

import { Button } from "./components/Button"
import { handleClick } from "./utils/temporaryHandleClick"
import { TranscriptCard } from "./components/TranscriptCard"
import { SelectedTranscript } from "./components/SelectedTranscript"

export default function Home() {
  const [token, setToken] = useState("")

  useEffect(() => {
    const cookieToken = Cookies.get("token")
    if (cookieToken) setToken(cookieToken)
  }, [token])

  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-16">
      <div className="flex flex-col">
        <Button text={"Get notes"} onClick={handleClick} />
        <TranscriptCard />
      </div>
      <SelectedTranscript />
      <Button text={"Log out"} onClick={handleClick} />
    </main>
  )
}
