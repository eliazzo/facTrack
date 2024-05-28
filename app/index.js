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
**/

// LIST CONFERENCE RECORDS AND GET MOST RECENT CONFERENCE NAME

async function callListConferenceRecords(authClient) {
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
for await (const response of iterable) {
    console.log(response.name);
  //   return response.name;
}
}

// authorize().then(callListConferenceRecords).catch(console.error) 
 

// LIST TRANSCRIPTS

async function callListTranscripts(authClient) {
    console.log('callListTranscripts')
    const parent = 'conferenceRecords/d0239518-c792-4bed-bdea-84982a5a2bc1'
    // const parent = await callListConferenceRecords(authClient)
    console.log({parent})
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
      console.log('Response:', response.name);
      return response.name

  }

  if (!found) {
      console.log('No transcripts found for the given conference record.');
  }
}



// GET TRANSCRIPT ENTRY

async function callGetTranscriptEntry(authClient) {
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
        response.forEach(entry => {
            console.log('Transcript Entry:', entry.text);
        });
    } else {
        console.log('No transcript entries found.');
    }
}

  
  
  authorize().then(callGetTranscriptEntry).catch(console.error)








