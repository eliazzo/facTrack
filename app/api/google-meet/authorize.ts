import fs from "fs/promises"
import path from "path"
import "dotenv/config"
import process from "process"
import { authenticate } from "@google-cloud/local-auth"
import { auth, OAuth2Client } from "google-auth-library"
import { client } from "@/app/utils/mongodb/newClient"

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

async function loadSavedCredentialsIfExist(): Promise<OAuth2Client | null> {
  try {
    // const content = await fs.readFile(TOKEN_PATH)
    // const credentials = JSON.parse(content.toString())

    await client.connect()

    const database = client.db("facTrack")
    const collection = database.collection("google_auth")
    const result = await collection.findOne()
    console.log("token from MongoDB: ", result && result.token)

    /**
     * A type assertion is being used here as the documentation states the type is OAuth2Client
     */
    return auth.fromJSON(result && result.token) as OAuth2Client
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
  console.log(client)
  const content = await fs.readFile(CREDENTIALS_PATH)
  console.log("content from credentials.json file: ", content)
  const credentials =
    process.env.GOOGLE_CREDENTIALS && JSON.parse(process.env.GOOGLE_CREDENTIALS)
  console.log("content from credentials env variabele ", credentials)
  // const keys = JSON.parse(content.toString())
  // const key = keys.installed || keys.web
  const key = credentials.installed || credentials.web
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  })
  await fs.writeFile(TOKEN_PATH, payload)
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

  /* updated credentials */
  const credentials =
    process.env.GOOGLE_CREDENTIALS && JSON.parse(process.env.GOOGLE_CREDENTIALS)
  const keyFilePath = path.join(process.cwd(), "tmp_credentials.json")

  await fs.writeFile(keyFilePath, JSON.stringify(credentials))

  //

  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  })
  if (client.credentials) {
    await saveCredentials(client)
  }

  await fs.unlink(keyFilePath)

  return client
}
