"use client"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

import { Button } from "./components/Button"
import { SelectedTranscript } from "./components/SelectedTranscript"
import { getDocument } from "./utils/mongodb/getDocument"
import { useState } from "react"
import type { Document, WithId } from "mongodb"

export default function Home() {
  const [notes, setNotes] = useState<Document | null>()
  const router = useRouter()

  const transformDocument = (doc: WithId<Document>) => {
    return {
      ...doc,
      _id: doc._id.toString(), // Convert ObjectId to string
    }
  }

  const getNotes = async () => {
    const latestDoc = await getDocument()
    if (latestDoc) {
      const transformedDoc = transformDocument(latestDoc)
      setNotes(transformedDoc)
    }
  }

  const getText = () => {
    console.log("this function will download the text")
  }

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
        <Button text={"Download text"} onClick={getText} />
        <Button text={"Log out"} onClick={logout} />
      </div>
      <SelectedTranscript selectedNotes={notes} />
    </main>
  )
}
