"use client"

export const SelectedTranscript: React.FC<any> = ({ selectedNotes }) => {
  console.log(selectedNotes)
  let discussionPoints
  let actions
  if (selectedNotes) {
    discussionPoints = selectedNotes["key discussion points"]
    actions = selectedNotes.actions
  }
  return (
    <div
      data-testid="selected-transcript"
      className="min-h-screen border-solid border-2 border-black m-2 p-10 w-8/12"
    >
      <h1 className="text-center">
        {selectedNotes
          ? selectedNotes.title
          : "Click 'Get notes' to see your meeting title"}
      </h1>
      <h2 className="mt-5">Attendees</h2>
      <ul className="mt-2 mb-8">
        {selectedNotes
          ? selectedNotes.attendees
          : "Click 'Get notes' to see your meeting attendees"}
      </ul>
      <h2>key discussion points</h2>
      <ol className="mt-2 mb-8">
        {selectedNotes
          ? discussionPoints.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))
          : "Click 'Get notes' to see your key discussion points"}
      </ol>
      <h2> Actions </h2>
      <ol className="mt-2 mb-8">
        {selectedNotes
          ? actions.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))
          : "Click 'Get notes' to see your meeting actions"}
      </ol>
    </div>
  )
}
