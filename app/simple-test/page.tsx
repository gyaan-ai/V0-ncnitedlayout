"use client"

import { useState } from "react"

export default function SimpleTest() {
  const [message, setMessage] = useState("Page loaded!")

  const handleClick = () => {
    console.log("Button clicked!")
    setMessage("Button works! Time: " + new Date().toLocaleTimeString())
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Simple Test</h1>
      <p>{message}</p>
      <button onClick={handleClick} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Click Me
      </button>
    </div>
  )
}
