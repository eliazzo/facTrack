"use client"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

import { Button } from "./components/Button"
import { TranscriptCard } from "./components/TranscriptCard"
import { SelectedTranscript } from "./components/SelectedTranscript"
import { getDocument } from "./utils/mongodb/getDocument"
import { useEffect, useState } from "react"
import type { Document } from "mongodb"

export default function Home() {
  const [notes, setNotes] = useState<Document | null>()
  const router = useRouter()

  const getNotes = async () => {
    const latestDoc = await getDocument()
    if (latestDoc) setNotes(latestDoc)
  }

  useEffect(() => {
    console.log("Current notes state:", notes)
  }, [notes])

  const logout = () => {
    Cookies.remove("token")
    router.push("/login")
  }

  return (
    <main
      id="Home"
      className="flex min-h-screen flex-row items-center justify-between p-16"
    >
      <div className="flex flex-col">
        <Button text={"Get notes"} onClick={getNotes} />
        <TranscriptCard />
      </div>
      <SelectedTranscript latestDoc={notes} />
      <Button text={"Log out"} onClick={logout} />
    </main>
  )
}
