import "dotenv/config"
import bcrypt from "bcrypt"
import { redirect } from "next/navigation"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

import AuthForm from "../components/AuthForm"
import { client } from "../utils/mongodb/newClient"

export default function Login() {
  async function login(formData: FormData) {
    "use server"

    console.log("starting login function")

    const { username, password } = {
      username: formData.get("username"),
      password: formData.get("password"),
    }
    console.log("checking for login data: ", { username, password })

    if (typeof username !== "string" || typeof password !== "string") {
      console.log("Invalid form data")
      return
    }

    console.log("client before client.connect(): ", { client })

    // await client.connect()

    // console.log("client AFTER client.connect(): ", { client })

    const database = client.db("facTrack")
    console.log({ database })
    const users = database.collection("users")

    console.log({ users })
    const query = { username }

    const user = await users.findOne(query)

    console.log({ user })

    if (!user) {
      console.log("user does not exist")
      return
    }

    // const checkPassword = await bcrypt.compare(password, user.password)
    // if (!checkPassword) {
    //   return
    // }

    // let token
    // if (process.env.JWT_TOKEN) {
    //   token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
    //     expiresIn: "1h",
    //   })
    // }
    // if (token) {
    //   cookies().set("token", token, {
    //     path: "/",
    //     httpOnly: false,
    //     secure: process.env.NODE_ENV === "production",
    //     maxAge: 60 * 60,
    //   })
    // }

    redirect("/")
  }
  return <AuthForm onSubmit={login} title={"Login page"} action={"Log in"} />
}
