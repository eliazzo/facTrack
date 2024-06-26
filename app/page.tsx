"use client"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

import { Button } from "./components/Button"
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

  /* this useEffect will be removed */
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
      className="flex min-h-screen flex-row  justify-between p-16"
    >
      <div className="flex flex-col p-10">
        <h1>How to use facTrack</h1>
        <p className="p-3">
          1. Check your google inbox for an email notifying you of the
          transcript creation (this can take a few minutes after the meeting
          ending)
        </p>
        <p className="p-3">
          2. After receiving the email, click the Process transcript button
          below
        </p>
        <Button
          text={"Process transcript"}
          onClick={processTranscipt}
          className={
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          }
        />
        <p className="p-3">
          3. Once you see an alert that tells you the notes have been processed,
          click the Get transcript notes button below
        </p>
        <Button
          text={"Get transcript notes"}
          onClick={getNotes}
          className={
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          }
        />
        <p className="p-3">
          4. Download the text by clicking the Download button
        </p>
        <button
          onClick={() => console.log("this will download text to user local")}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>Download</span>
        </button>
      </div>
      <SelectedTranscript latestDoc={notes} />
      <div className="p-10">
        <button
          onClick={logout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Log out
        </button>
      </div>
    </main>
  )
}
