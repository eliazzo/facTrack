"use client"
import type { Document } from "mongodb"
import { useState } from "react"

type SelectedTranscriptProps = {
  latestDoc: Document | null | undefined
}

export const SelectedTranscript: React.FC<SelectedTranscriptProps> = ({
  latestDoc,
}) => {
  const [attendees, setAttendees] = useState(
    latestDoc ? latestDoc.attendees : []
  )
  const [keyDiscussionPoints, setKeyDiscussionPoints] = useState(
    latestDoc ? latestDoc.keyDiscussionPoints : []
  )
  let discussionPoints
  if (latestDoc) {
    discussionPoints = latestDoc["key discussion points"]
  }

  //@ts-ignore
  const handleEdit = (list, setList, index, newValue) => {
    const updatedList = [...list]
    updatedList[index] = newValue
    setList(updatedList)
  }

  return (
    <div
      data-testid="selected-transcript"
      className="min-h-screen m-2 p-10 w-8/12 bg-slate-50 rounded-2xl"
    >
      <h1 className="text-center">
        {latestDoc ? latestDoc.title : "Meeting title"}
      </h1>
      <h2 className="mt-8 mb-5">Attendees</h2>
      {latestDoc && latestDoc.attendees ? (
        <ul>
          {latestDoc.attendees.map((attendee: string, index: number) => (
            <li key={index}>
              <input
                type="text"
                value={attendee}
                onChange={(e) =>
                  handleEdit(attendees, setAttendees, index, e.target.value)
                }
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>Meeting attendees will be listed here.</p>
      )}
      <h2 className="mt-8 mb-5">Key Discussion Points</h2>
      {latestDoc && latestDoc.keyDiscussionPoints ? (
        <ul>
          {latestDoc.keyDiscussionPoints.map((item: string, index: number) => (
            <li key={index}>
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleEdit(
                    keyDiscussionPoints,
                    setKeyDiscussionPoints,
                    index,
                    e.target.value
                  )
                }
              />
            </li>
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
