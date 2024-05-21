const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {SpacesServiceClient} = require('@google-apps/meet').v2;
const { auth } = require('google-auth-library');

// If modifying these scopes, delete token.json.
const SCOPES = [
    'https://www.googleapis.com/auth/meetings.space.created',
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/meetings.space.readonly',
    'https://www.googleapis.com/auth/meetings'
];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
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
async function saveCredentials(client) {
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

// CREATE A NEW MEETING

/**
 * Creates a new meeting space.
@param {OAuth2Client} authClient An authorized OAuth2 client.
 
async function createSpace(authClient) {
  const meetClient = new SpacesServiceClient({
    authClient: authClient
  });
  // Construct request
  const request = {
  };

  // Run request
  const response = await meetClient.createSpace(request);
  console.log(`Meet URL: ${response[0].meetingUri}`);
}

authorize().then(createSpace).catch(console.error);
**/

// LIST TRANSCRIPTS

// Imports the Meet library
const {ConferenceRecordsServiceClient} = require('@google-apps/meet').v2;
const parent = 'conferenceRecords/90fa1731-7c59-455d-a8e8-39a6778850ef'// 'Invalid conference id'

async function callListTranscripts(authClient) {
    console.log('call list transcripts( )')
    // Instantiates a client
const meetClient = new ConferenceRecordsServiceClient({
    authClient: authClient
});
  // Construct request
  const request = {
    parent,
  };
  console.log({parent})


  // Run request
  const iterable = meetClient.listTranscriptsAsync(request);
  console.log({iterable})
  let found = false;
  for await (const response of iterable) {
      found = true;
      console.log('Response:', response);
  }

  if (!found) {
      console.log('No transcripts found for the given conference record.');
  }
}

authorize().then(callListTranscripts).catch(console.error)

// GET SINGLE TRANSCRIPT USING NAME

async function callGetTranscript( authClient) {
    const name = 'spaces/CtB3UYEYaW4B' // 'Invalid resource name'
        // Instantiates a client
const meetClient = new ConferenceRecordsServiceClient({
    authClient: authClient
});
  // Construct request
  const request = {
    name,
  };

  // Run request
  const response = await meetClient.getTranscript(request);
  console.log(response);
}

// authorize().then(callGetTranscript).catch(console.error)




// LIST CONFERENCE RECORDS

async function callListConferenceRecords(authClient) {
    // Instantiates a client
const meetClient = new ConferenceRecordsServiceClient({
    authClient: authClient
});
  // Construct request
  const request = {
  };

  // Run request
  const iterable = meetClient.listConferenceRecordsAsync(request);
  for await (const response of iterable) {
      console.log(response);
  }
}

// authorize().then(callListConferenceRecords).catch(console.error)


// SEARCH FOR A CONFERENCE USING THE NAME

async function callGetConferenceRecord(authClient) {
    const name = 'conferenceRecords/f761e440-2c70-4e7d-a4de-1dc11d3b1e33'// 'Invalid resource name'
    const meetClient = new ConferenceRecordsServiceClient({
        authClient: authClient
    });
  // Construct request
  const request = {
    name,
  };

  // Run request
  const response = await meetClient.getConferenceRecord(request);
  console.log(response);
}

// authorize().then(callGetConferenceRecord).catch(console.error)
