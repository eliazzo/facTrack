const client = require("../newClient")

async function getDocument() {
  try {
    const database = client.db("facTrack")
    const transcripts = database.collection("transcripts")
    // Query document using title value
    const query = { title: "Curriculum Concoctions" }
    const transcript = await transcripts.findOne(query)
    console.log(transcript)
  } finally {
    await client.close()
  }
}
getDocument().catch(console.dir)
