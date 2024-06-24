"use client"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

import { Button } from "./components/Button"
import { TranscriptCard } from "./components/TranscriptCard"
import { SelectedTranscript } from "./components/SelectedTranscript"
import { getDocument } from "./utils/mongodb/getDocument"
import { useEffect, useState } from "react"
import type { Document } from "mongodb"
import { insertDocument } from "./utils/mongodb/insertDocument"

export default function Home() {
  const [notes, setNotes] = useState<Document | null>()
  const router = useRouter()

  const processTranscipt = async () => {
    await insertDocument()
    console.log("check database for latest transcript")
  }

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
        <h1>How to use facTrack</h1>
        <p>
          1. Wait for google to email you notifying you of the transcript
          creation
        </p>
        <p>
          2. After receiving the email, click the Process notes button below{" "}
        </p>
        <Button text={"Process notes"} onClick={processTranscipt} />
        <p>
          3. Once you see an alert that tells you the notes have been processed,
          click Get notes
        </p>
        <Button text={"Get notes"} onClick={getNotes} />
        <p>4. Download the text by clicking Download notes</p>
        <Button
          text={"Download notes"}
          onClick={() => console.log("this will download text to user local")}
        />
        {/* <TranscriptCard /> */}
      </div>
      <SelectedTranscript latestDoc={notes} />
      <Button text={"Log out"} onClick={logout} />
    </main>
  )
}
