import fs from "fs/promises"
import path from "path"
import process from "process"
import { authenticate } from "@google-cloud/local-auth"
import { auth, OAuth2Client } from "google-auth-library"
import "dotenv/config"

// If modifying these scopes, delete token.json.
const SCOPES = [
  "https://www.googleapis.com/auth/meetings.space.created",
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/meetings.space.readonly",
  "https://www.googleapis.com/auth/meetings",
]

/* The file token.json stores the user's access and refresh tokens, and is
created automatically when the authorization flow completes for the first
time. */
const TOKEN_PATH = path.join(process.cwd(), "token.json")
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json")

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */

// let token: any

async function loadSavedCredentialsIfExist(): Promise<OAuth2Client | null> {
  try {
    const content = await fs.readFile(TOKEN_PATH)
    const credentials = JSON.parse(content.toString())
    /**
     * A type assertion is being used here as the documentation states the type is OAuth2Client
     */
    return auth.fromJSON(credentials) as OAuth2Client
  } catch (err) {
    console.log(err)
    return null
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */

async function saveCredentials(client: OAuth2Client): Promise<void> {
  /* new: credentials from env variable */
  const contentFromEnv = process.env.GOOGLE_CREDENTIALS
  console.log({ contentFromEnv })
  const parsedContentFromEnv = contentFromEnv && JSON.parse(contentFromEnv)
  console.log({ parsedContentFromEnv })
  const keyNew = parsedContentFromEnv.installed || parsedContentFromEnv.web
  const payloadNew = JSON.stringify({
    type: "authorized_user",
    client_id: keyNew.client_id,
    client_secret: keyNew.client_secret,
    refresh_token: client.credentials.refresh_token,
  })
  await fs.writeFile(TOKEN_PATH, payloadNew)
  //

  /* original 
  const content = await fs.readFile(CREDENTIALS_PATH)
  console.log({ content })
  const keys = JSON.parse(content.toString())
  console.log({ keys })
  const key = keys.installed || keys.web
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  })
  await fs.writeFile(TOKEN_PATH, payload)
  */
}

/**
 * Load or request or authorization to call APIs.
 *
 */
export async function authorize(): Promise<OAuth2Client> {
  let client = await loadSavedCredentialsIfExist()
  if (client) {
    return client
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  })
  if (client.credentials) {
    await saveCredentials(client)
  }
  console.log("authorisation successful")
  return client
}
authorize()
