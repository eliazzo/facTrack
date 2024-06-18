"use client"

export const SelectedTranscript: React.FC = (/* meeting card data */) => {
  return (
    <div className="min-h-screen border-solid border-2 border-black m-2 p-10 w-8/12">
      <h1 className="text-center" id="title">
        Curriculum Concoctions
      </h1>
      <h2 className="mt-5">Attendees</h2>
      <p id="attendees">Ben, Sarah, Dan, Nich</p>
      <h2>key discussion points</h2>
      <p id="discussion points">
        National apprenticeship week content: Ben and Sarah are focusing on
        creating content for National apprenticeship week and attending events
        and conferences related to it. Networking events: Sarah is attending
        various networking events, including an apprenticeships event in
        Islington and a networking breakfast in Tower Hamlets, to make new
        contacts and promote the organization. Curriculum development and
        support sessions: Shaughn is meeting with the council to discuss
        curriculum development for apprenticeships and is also excited about
        leading support sessions. Dan to follow up on promoting unblock during
        the patient week and to check if there is a website or content that can
        be shared. Sarah requests content for the newsletter related to
        Apprenticeships week, with a deadline for submission today. Discussion
        about potential events for the newsletter and the need for clarity on
        upcoming events.
      </p>
      <h2> Actions </h2>
      <p id="actions">
        Action Items Catch up with Beth and Nick on other projects and attend a
        call with More Digital. Assist with the case study for National
        Apprenticeship Week. Provide content for the newsletter regarding
        National Apprenticeship Week. Announce the new 10th birthday date in the
        newsletter. Meet with Selwyn from the council to discuss curriculum
        development for apprenticeships.
      </p>
    </div>
  )
}
