import { redirect } from "next/navigation"
const client = require("../mongodb/newClient")
const bcrypt = require("bcrypt")

export default function SignUp() {
  async function test(formData: FormData) {
    "use server"
    const data = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    }
    const database = client.db("facTrack")
    const users = database.collection("users")
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const username = await data.username
    try {
      await users.insertOne({ username, password: hashedPassword })
      console.log("new user created")
    } catch (error) {
      console.log(error, { error: "User creation failed" })
    }

    console.log(data)
    redirect("/")
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-16">
      <h1>sign up page</h1>
      <form action={test}>
        <p>username</p>
        <input placeholder="username" name="username"></input>
        <p>password</p>
        <input placeholder="password" name="password"></input>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}
