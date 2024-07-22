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
      className="min-h-screen m-2 p-10 w-8/12 bg-slate-50"
    >
      <h1 className="text-center">
        {latestDoc ? latestDoc.title : "Meeting title"}
      </h1>
      <h2 className="mt-8 mb-5">Attendees</h2>
      {latestDoc && latestDoc.attendees ? (
        <ul>
          {latestDoc.attendees.map((attendee: string, index: number) => (
            <li key={index}>{attendee}</li>
          ))}
        </ul>
      ) : (
        <p>Meeting attendees will be listed here.</p>
      )}
      <h2 className="mt-8 mb-5">Key Discussion Points</h2>
      {latestDoc && latestDoc.keyDiscussionPoints ? (
        <ul>
          {latestDoc.keyDiscussionPoints.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>Key discussion points will go here.</p>
      )}
      <h2 className="mt-8 mb-5">Actions</h2>
      {latestDoc && latestDoc.actions ? (
        <ul>
          {latestDoc.actions.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>Actions will go here.</p>
      )}
    </div>
  )
}
