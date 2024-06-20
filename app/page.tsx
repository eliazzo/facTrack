"use client"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

import { Button } from "./components/Button"
import { TranscriptCard } from "./components/TranscriptCard"
import { SelectedTranscript } from "./components/SelectedTranscript"
import { getDocument } from "./utils/mongodb/getDocument"

export default function Home() {
  const router = useRouter()

  const getNotes = () => {
    const latestDoc = getDocument()
    console.log({ latestDoc })
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
