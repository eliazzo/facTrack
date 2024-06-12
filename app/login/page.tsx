require("dotenv").config()
const bcrypt = require("bcrypt")
import { redirect } from "next/navigation"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

import AuthForm from "../components/AuthForm"
const client = require("../mongodb/newClient")

export default function Login() {
  async function login(formData: FormData) {
    "use server"
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    }

    const username = await data.username
    const password = await data.password

    const database = client.db("facTrack")
    const users = database.collection("users")
    const query = { username: username }
    const user = await users.findOne(query)

    if (!user) {
      console.log("user does not exist")
      return
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      return
    }

    let token
    if (process.env.JWT_TOKEN) {
      token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
        expiresIn: "1h",
      })
    }
    if (token) cookies().set("token", token, { expires: 1, secure: true })

    redirect("/")
  }
  return <AuthForm onSubmit={login} title={"Login page"} action={"Log in"} />
}