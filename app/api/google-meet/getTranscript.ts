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

/* List conference records */

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

/* Get latest transcript name using conference records */

async function callListTranscripts(authClient: AuthStructure) {
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

authorize().then(callGetTranscriptEntry).catch(console.error)

module.exports = { authorize, callGetTranscriptEntry }
