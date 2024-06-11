"use client"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import Cookies from "js-cookie"

export const HandleToken = () => {
  const [token, setToken] = useState<string>("")

  useEffect(() => {
    console.log("handling token")
    const params = new URLSearchParams(window.location.search)
    const tokenFromParams = params.get("token")
    console.log({ tokenFromParams })
    if (tokenFromParams) {
      setToken(tokenFromParams)
      /* When setting the state using the setToken function from useState, the updated state (token) isn't immediately available in the same render cycle.
      The following part where the cookie is set needs to take place in a different useEffect that runs after this one
      */
      console.log({ token })
      // Cookies.set("token", token, { expires: 1, secure: true })
      redirect("/")
    }
  }, [token, setToken])

  return <h1>logging in</h1>
}

export default HandleToken
