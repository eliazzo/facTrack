"use client"

export const SelectedTranscript: React.FC<any> = ({ latestDoc }) => {
  return (
    <div
      data-testid="selected-transcript"
      className="min-h-screen border-solid border-2 border-black m-2 p-10 w-8/12"
    >
      <h1 className="text-center">
        {latestDoc ? latestDoc.title : "Meeting title"}
      </h1>
      <h2 className="mt-5">Attendees</h2>
      <p>{latestDoc ? latestDoc.attendees : "Meeting attendees"}</p>
      <h2>key discussion points</h2>
      {latestDoc
        ? latestDoc["key discussion points"]
        : "key discussion points will go here"}
      <h2> Actions </h2>
      <p>{latestDoc ? latestDoc.actions : "actions will go here"}</p>
    </div>
  )
}
