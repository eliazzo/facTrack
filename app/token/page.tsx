"use client"
const Cookies = require("js-cookie")
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"

const HandleToken = () => {
  const [token, setToken] = useState<string>("")

  useEffect(() => {
    console.log("handling token")
    const params = new URLSearchParams(window.location.search)
    const tokenFromParams = params.get("token")

    if (tokenFromParams) {
      setToken(tokenFromParams)
    }
  }, [])

  useEffect(() => {
    if (token !== "") {
      Cookies.set("token", token, { expires: 1, secure: true })

      redirect("/")
    }
  }, [token])

  return <h1>logging in</h1>
}

export default HandleToken
