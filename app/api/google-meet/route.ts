const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {SpacesServiceClient, ConferenceRecordsServiceClient} = require('@google-apps/meet').v2;
const { auth } = require('google-auth-library');

// If modifying these scopes, delete token.json.
const SCOPES = [
    'https://www.googleapis.com/auth/meetings.space.created',
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/meetings.space.readonly',
    'https://www.googleapis.com/auth/meetings'
];

/* The file token.json stores the user's access and refresh tokens, and is
created automatically when the authorization flow completes for the first
time. */
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return auth.fromJSON(credentials);
  } catch (err) {
    console.log(err);
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */

async function saveCredentials(client: AuthStructure) {
  console.log(client)
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}


/**
 * Creates a new meeting space.
@param {OAuth2Client} authClient An authorized OAuth2 client.
**/

/** AuthStructure types created with gpt */
const kCapture = Symbol('kCapture');

interface Credentials {
  refresh_token: string;
}

interface DefaultTransporter {}

interface UserRefreshClient {
  _events: Record<string, any>;
  _eventsCount: number;
  _maxListeners?: number;
  transporter: DefaultTransporter;
  credentials: Credentials;
  eagerRefreshThresholdMillis: number;
  forceRefreshOnFailure: boolean;
  certificateCache: Record<string, any>;
  certificateExpiry: Date | null;
  certificateCacheFormat: string;
  refreshTokenPromises: Map<any, any>;
  _clientId: string;
  _clientSecret: string;
  redirectUri?: string;
  _refreshToken: string;
  quotaProjectId?: string;
  [key: symbol]: boolean;
}

interface AuthStructure {
  credentials: any;
  authClient: UserRefreshClient;
}

// LIST CONFERENCE RECORDS AND GET MOST RECENT CONFERENCE NAME

async function callListConferenceRecords(authClient: AuthStructure, index: number) {
  console.log('callListConferenceRecords()')
  // Instantiates a client
const meetClient = new ConferenceRecordsServiceClient({
  authClient: authClient
});
// Construct request
const request = {
};

// Run request
const iterable = meetClient.listConferenceRecordsAsync(request);

const records = []

for await (const response of iterable) {
  records.push(response.name)

}
console.log(records[index])
return(records[index])
}
 

// LIST TRANSCRIPTS USING CONFERENCE NAME

async function callListTranscripts(authClient: AuthStructure) {
    console.log('callListTranscripts()')
    const parent = await callListConferenceRecords(authClient, 0)

    // Instantiates a client
const meetClient = new ConferenceRecordsServiceClient({
    authClient: authClient
});
  // Construct request
  const request = {
    parent,
  };
  // Run request
  const iterable = meetClient.listTranscriptsAsync(request);

  let found = false;
  for await (const response of iterable) {
      found = true;
      console.log('Response:', response.name);
      return response.name

  }

  if (!found) {
    console.log('No transcripts found for the latest conference record, trying the next conference record');
    const parent = await callListConferenceRecords(authClient, 1)
      // Construct request
  const request = {
    parent,
  };
  // Run request
  const iterable = meetClient.listTranscriptsAsync(request);

  let found = false;
  for await (const response of iterable) {
      found = true;
      console.log('Response:', response.name);
      return response.name

  }
  }
}


// GET TRANSCRIPT ENTRY

async function callGetTranscriptEntry(authClient: AuthStructure) {
  // console.log({authClient})
    console.log('callGetTranscriptEntry()')
    const name = await callListTranscripts(authClient)

const meetClient = new ConferenceRecordsServiceClient({
authClient: authClient
})
    // Construct request
    const request = {
      parent: name,
    };
  
    // Run request
    const [response] = await meetClient.listTranscriptEntries(request);
    if (response) {
        response.forEach((entry: { text: string; }) => {
            console.log('Transcript Entry:', entry.text);
            return({'Transcript Entry': entry.text})
        });
    } else {
        console.log('No transcript entries found.');
    }
}

  
authorize().then(callGetTranscriptEntry).catch(console.error)

module.exports = { authorize, callGetTranscriptEntry } 







