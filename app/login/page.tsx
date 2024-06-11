require("dotenv").config()
import { redirect } from "next/navigation"
import AuthForm from "../components/AuthForm"
const client = require("../mongodb/newClient")
const bcrypt = require("bcrypt")
import jwt from "jsonwebtoken"

export default function Login() {
  async function handleSubmit(formData: FormData) {
    "use server"
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    }
    console.log({ data })

    const username = await data.username
    const password = await data.password

    const database = client.db("facTrack")
    const users = database.collection("users")
    const query = { username: username }
    const user = await users.findOne(query)

    if (!user) {
      return
    }
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      return
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "1h",
    })

    redirect(`/token?token=${token}`)
  }
  return <AuthForm onSubmit={handleSubmit} />
}
