const { MongoClient } = require("mongodb")

// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://admin:TOVbwkvwjrpQf0r0@factrack0.9xgcqcx.mongodb.net/?retryWrites=true&w=majority&appName=facTrack0"

const client = new MongoClient(uri)

async function run() {
  try {
    const database = client.db("facTrack")
    const transcripts = database.collection("transcripts")
    // Query for a transcript that has the title 'Back to the Future'
    const query = { title: "Curriculum Concoctions" }
    const transcript = await transcripts.findOne(query)
    console.log(transcript)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}
run().catch(console.dir)
