"use client"

export const SelectedTranscript: React.FC<any> = ({ selectedNotes }) => {
  console.log(selectedNotes)
  return (
    <div
      data-testid="selected-transcript"
      className="min-h-screen border-solid border-2 border-black m-2 p-10 w-8/12"
    >
      <h1 className="text-center">
        {selectedNotes ? selectedNotes.title : "Meeting title"}
      </h1>
      <h2 className="mt-5">Attendees</h2>
      {selectedNotes ? selectedNotes.attendees : "Meeting attendees"}
      <h2>key discussion points</h2>
      {selectedNotes
        ? selectedNotes["key discussion points"]
        : "key discussion points will go here"}
      <h2> Actions </h2>
      <p>{selectedNotes ? selectedNotes.actions : "actions will go here"}</p>
    </div>
  )
}
