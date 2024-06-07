require("dotenv").config()
const { MongoClient } = require("mongodb")

// Replace the uri string with your connection string.
const uri = process.env.MONGODB_URI

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
