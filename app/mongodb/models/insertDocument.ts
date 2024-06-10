require("dotenv").config()
const { MongoClient } = require("mongodb")

// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.MONGODB_URI

const client = new MongoClient(uri)

async function run() {
  try {
    await client.connect()

    const database = client.db("facTrack")
    const transcripts = database.collection("transcripts")
    // create a document to be inserted
    const doc = {
      title: "Support Circle Planning",
      attendees: "Beth, Tavie, Jess",
      key_discussion_points: "",
      actions:
        "- share callouts on Discord \n - reach out to all women/non-binary people on airtable and offer them the support circles as well as those who previously attended support circles \n - Have a mailing list \n - save the date \n - Send out Safeguarding details for all mentors",
    }
    const result = await transcripts.insertOne(doc)

    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
    )
  } finally {
    await client.close()
  }
}
run().catch(console.dir)
