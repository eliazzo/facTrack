require("dotenv").config()
const bcrypt = require("bcrypt")
import { redirect } from "next/navigation"
import jwt from "jsonwebtoken"

import AuthForm from "../components/AuthForm"
const client = require("../mongodb/newClient")

export default function Login() {
  async function login(formData: FormData) {
    "use server"
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    }
    console.log("login data: ", data)

    const username = await data.username
    const password = await data.password

    const database = client.db("facTrack")
    const users = database.collection("users")
    const query = { username: username }
    const user = await users.findOne(query)

    console.log({ user })
    if (!user) {
      console.log("user does not exist")
      return
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    console.log({ checkPassword })
    if (!checkPassword) {
      return
    }

    let token
    if (process.env.JWT_TOKEN) {
      token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
        expiresIn: "1h",
      })
    }
    redirect(`/token?token=${token}`)
  }
  return <AuthForm onSubmit={login} title={"Login page"} action={"Log in"} />
}
