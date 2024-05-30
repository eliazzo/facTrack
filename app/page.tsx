const { TranscriptCard } = require("./components/TranscriptCard")
const { SelectedTranscript } = require("./components/SelectedTranscript")

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24">
      <div className="flex flex-col">
      <TranscriptCard/>
      </div>
      <SelectedTranscript/>
    </main>
  );
}
