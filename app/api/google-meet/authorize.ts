import fs from "fs/promises"

import path from "path"
import "dotenv/config"
import process from "process"
import { authenticate } from "@google-cloud/local-auth"
import { auth, OAuth2Client } from "google-auth-library"
import { mongoClient } from "../../utils/mongodb/newClient"
import { getToken } from "../../utils/mongodb/getToken"

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
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json") // original
// const CREDENTIALS_PATH = path.resolve(__dirname, "credentials.json")

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */

async function loadSavedCredentialsIfExist(): Promise<OAuth2Client | null> {
  try {
    const content = await getToken()
    const credentials = JSON.parse(content)
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
  const content = process.env.GOOGLE_CREDENTIALS
  const keys = content && JSON.parse(content)
  const key = keys.installed || keys.web

  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  })

  const token = payload

  /*insert token into db */
  const insertToken = async (token: string) => {
    const database = mongoClient.db("facTrack")
    const google_auth = database.collection("google_auth")
    const doc = {
      user_id: "the users id",
      token: token,
    }

    await google_auth.insertOne(doc)
  }

  await insertToken(token)
}

/**
 * Load or request or authorization to call APIs.
 *
 */
export async function authorize(): Promise<OAuth2Client> {
  let client = await loadSavedCredentialsIfExist()
  console.log({ client }, "client from loadSavedCredentialsIfExists")
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
