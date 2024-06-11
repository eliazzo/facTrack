"use client"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"

export const HandleToken = () => {
  const [token, setToken] = useState<string>("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tokenFromParams = params.get("token")

    if (tokenFromParams) {
      setToken(tokenFromParams)
      localStorage.setItem("token", token)
      redirect("/")
    }
  }, [token, setToken])

  return <h1>logging in</h1>
}

export default HandleToken
