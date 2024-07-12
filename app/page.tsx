"use client"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import BeatLoader from "react-spinners/BeatLoader"

import { Button } from "./components/Button"
import { SelectedTranscript } from "./components/SelectedTranscript"
import { getDocument } from "./utils/mongodb/getDocument"
import { useEffect, useState } from "react"
import type { Document } from "mongodb"
import { insertDocument } from "./utils/mongodb/insertDocument"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Home() {
  const [notes, setNotes] = useState<Document | null>()
  let [loadingTranscript, setLoadingTranscript] = useState(false)
  let [loadingNotes, setLoadingNotes] = useState(false)
  const router = useRouter()

  const processTranscipt = async () => {
    setLoadingTranscript(true)
    await insertDocument()
    setLoadingTranscript(false)
    console.log("check database for latest transcript")
    toast("Meeting notes ready !")
  }

  const getNotes = async () => {
    setLoadingNotes(true)
    const latestDoc = await getDocument()
    if (latestDoc) setNotes(latestDoc)
    setLoadingNotes(false)
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
          2. After receiving the email, click the Process Transcript button
          below
        </p>
        <Button
          dataTestId={"process-transcript"}
          text={"Process Transcript"}
          onClick={processTranscipt}
          className={
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          }
        />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <BeatLoader
          className="justify-center my-6"
          color={"#ffffff"}
          loading={loadingTranscript}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <p className="p-3">
          3. When you see an alert that tells you the meeting notes are ready,
          click the Get Meeting Notes button below
        </p>
        <Button
          dataTestId="get-notes"
          text={"Get Meeting Notes"}
          onClick={getNotes}
          className={
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          }
        />
        <BeatLoader
          className="justify-center my-6"
          color={"#ffffff"}
          loading={loadingNotes}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <p className="p-3">
          4. Download the text by clicking the Download button
        </p>
        <button
          data-testid="download"
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
          data-testid="log-out"
          onClick={logout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Log out
        </button>
      </div>
    </main>
  )
}
