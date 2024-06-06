const { authorize } = require("./authorize")
const { SpacesServiceClient, ConferenceRecordsServiceClient } =
  require("@google-apps/meet").v2

/** authStructure type created with gpt */
const kCapture = Symbol("kCapture")

interface Credentials {
  refresh_token: string
}

interface DefaultTransporter {}

interface UserRefreshClient {
  _events: Record<string, any>
  _eventsCount: number
  _maxListeners?: number
  transporter: DefaultTransporter
  credentials: Credentials
  eagerRefreshThresholdMillis: number
  forceRefreshOnFailure: boolean
  certificateCache: Record<string, any>
  certificateExpiry: Date | null
  certificateCacheFormat: string
  refreshTokenPromises: Map<any, any>
  _clientId: string
  _clientSecret: string
  redirectUri?: string
  _refreshToken: string
  quotaProjectId?: string
  [key: symbol]: boolean
}

interface AuthStructure {
  credentials: any
  authClient: UserRefreshClient
}
// LIST CONFERENCE RECORDS AND GET MOST RECENT CONFERENCE NAME

async function callListConferenceRecords(authClient: AuthStructure) {
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

// LIST TRANSCRIPTS USING CONFERENCE NAME
/* The use of promise.all is scrambling the order of the transcript names
and resulting in a different transcript entry being fetched each time it is called */

async function callListTranscripts(authClient: AuthStructure) {
  const parents = await callListConferenceRecords(authClient)

  // Instantiates a client
  const meetClient = new ConferenceRecordsServiceClient({
    authClient: authClient,
  })

  let names: string[] = []

  const promises = parents.map(async (parent) => {
    // Construct request
    const request = {
      parent,
    }

    // Run request
    const iterable = meetClient.listTranscriptsAsync(request)

    for await (const response of iterable) {
      names.push(response.name)
    }
  })
  await Promise.all(promises)
  console.log("NAMES: ", names)
  return names[0]
}

// GET TRANSCRIPT ENTRY

async function callGetTranscriptEntry(authClient: AuthStructure) {
  const name = await callListTranscripts(authClient)

  const meetClient = new ConferenceRecordsServiceClient({
    authClient: authClient,
  })
  // Construct request
  const request = {
    parent: name,
  }

  // Run request
  const iterable = meetClient.listTranscriptEntriesAsync(request)
  for await (const response of iterable) {
    console.log("TEXT: ", response.text)
  }
}

// authorize().then(callGetTranscriptEntry).catch(console.error)

module.exports = { authorize, callGetTranscriptEntry }
