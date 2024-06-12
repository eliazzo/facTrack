import { Button } from "./components/Button"

const { TranscriptCard } = require("./components/TranscriptCard")
const { SelectedTranscript } = require("./components/SelectedTranscript")

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-16">
      <div className="flex flex-col">
        <Button text={""} handleClick={() => console.log("button function")} />
        <TranscriptCard />
      </div>
      <SelectedTranscript />
    </main>
  )
}
