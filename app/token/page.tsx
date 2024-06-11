"use client"

import { useEffect, useState } from "react"

export default function ProcessToken() {
  const [token, setToken] = useState<string>("")
  console.log("auth form")
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tokenFromParams = params.get("token")
    console.log({ tokenFromParams })

    if (tokenFromParams) {
      setToken(tokenFromParams)
      localStorage.setItem("token", token)
      window.location.replace("/")
    }
  }, [token, setToken])
  return <h1>logging in</h1>
}
