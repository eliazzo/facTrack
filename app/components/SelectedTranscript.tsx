"use client"
import type { Document } from "mongodb"

type SelectedTranscriptProps = {
  latestDoc: Document | null | undefined
}

export const SelectedTranscript: React.FC<SelectedTranscriptProps> = ({
  latestDoc,
}) => {
  let discussionPoints
  if (latestDoc) {
    discussionPoints = latestDoc["key discussion points"]
  }
  return (
    <div
      data-testid="selected-transcript"
      className="min-h-screen border-solid border-2 border-black m-2 p-10 w-8/12"
    >
      <h1 className="text-center">
        {latestDoc ? latestDoc.title : "Meeting title"}
      </h1>
      <h2 className="mt-8 mb-5">Attendees</h2>
      <p>{latestDoc ? latestDoc.attendees : "Meeting attendees"}</p>
      <h2 className="mt-8 mb-5">key discussion points</h2>
      {latestDoc
        ? discussionPoints.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))
        : "key discussion points will go here"}
      <h2 className="mt-8 mb-5"> Actions </h2>
      {latestDoc
        ? latestDoc.actions.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))
        : "actions will go here"}
    </div>
  )
}
