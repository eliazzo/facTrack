const { ConferenceRecordsServiceClient } = require("@google-apps/meet").v2
import { OAuth2Client } from "google-auth-library"

/* List conference records */

async function callListConferenceRecords(authClient: OAuth2Client) {
  // Instantiates a client
  const meetClient = new ConferenceRecordsServiceClient({
    authClient: authClient,
  })
  // Construct request
  const request = {}

  // Run request
  const iterable = meetClient.listConferenceRecordsAsync(request)

  const records = []

  for await (const response of iterable) {
    records.push(response.name)
  }
  return records
}

/* Get latest transcript name using conference records */

async function callListTranscripts(authClient: OAuth2Client) {
  const parents = await callListConferenceRecords(authClient)

  // Instantiates a client
  const meetClient = new ConferenceRecordsServiceClient({
    authClient: authClient,
  })

  let names: any = []

  const promises = parents.map(async (parent) => {
    // Construct request
    const request = {
      parent,
    }

    // Run request
    const iterable = meetClient.listTranscriptsAsync(request)

    for await (const response of iterable) {
      names.push(response)
    }
  })

  await Promise.all(promises)

  names.sort((x: any, y: any) => {
    return parseInt(y.endTime.seconds, 10) - x.endTime.seconds
  })

  return names[0].name
}

/* Get transcript entry using latest transcript name */

export async function callGetTranscriptEntry(authClient: OAuth2Client) {
  console.log("authClient in callGetTranscriptEntry")
  const name = await callListTranscripts(authClient)

  const meetClient = new ConferenceRecordsServiceClient({
    authClient: authClient,
  })
  // Construct request
  const request = {
    parent: name,
  }

  // Run request
  let transcriptEntries = []

  const iterable = meetClient.listTranscriptEntriesAsync(request)
  for await (const response of iterable) {
    transcriptEntries.push(response)
  }

  return transcriptEntries.map((entry) => entry.text).join(" ")
}
