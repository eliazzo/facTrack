"use client"
import type { Document } from "mongodb"
import { useEffect, useState } from "react"

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
  const [actions, setActions] = useState(latestDoc ? latestDoc.actions : [])

  useEffect(() => {
    if (latestDoc) {
      setAttendees(latestDoc.attendees || [])
      setKeyDiscussionPoints(latestDoc.keyDiscussionPoints || [])
      setActions(latestDoc.actions || [])
    }
  }, [latestDoc])

  //@ts-ignore
  // const handleEdit = (list, setList, index, newValue) => {
  //   const updatedList = [...list]
  //   updatedList[index] = newValue
  //   setList(updatedList)
  // }

  const handleEdit = (
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    newValue: string
  ) => {
    setList((prevList) => {
      const updatedList = [...prevList]
      updatedList[index] = newValue
      return updatedList
    })
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
          {attendees.map((attendee: string, index: number) => (
            <li key={index}>
              <input
                type="text"
                value={attendee}
                onChange={(e) =>
                  handleEdit(setAttendees, index, e.target.value)
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
          {keyDiscussionPoints.map((item: string, index: number) => (
            <li key={index}>
              <textarea
                value={item}
                onChange={(e) =>
                  handleEdit(setKeyDiscussionPoints, index, e.target.value)
                }
                className="w-full p-2 rounded resize-y"
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
          {actions.map((item: string, index: number) => (
            <li key={index}>
              <textarea
                value={item}
                onChange={(e) => handleEdit(setActions, index, e.target.value)}
                className="w-full p-2 rounded resize-y"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>Actions will go here.</p>
      )}
    </div>
  )
}
