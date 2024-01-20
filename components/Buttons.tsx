"use client"

import { useState } from "react"
import { Copy, Save, X } from "./Icons"
import { showNotification } from "./Notification"

export default function Buttons(props: { image: string }) {
  return (
    <>
      <button
        onClick={() => {
          const a = document.createElement("a")
          a.href = props.image
          a.download = "memoji.png"
          a.target = "_blank"
          a.click()
        }}
        className="h-10 truncate px-4 gap-2 md:w-auto w-full font-medium flex items-center justify-center bg-black text-white shadow-md shadow-black/5 transition-colors hover:bg-zinc-800 rounded-lg"
      >
        <Save size={20} className="md:block hidden" />
        <span>Download Image</span>
      </button>
      <button
        onClick={() => {
          const url = window.location.href
          navigator.clipboard.writeText(url)

          showNotification("Copied link to clipboard!")
        }}
        className="h-10 truncate md:w-auto w-full px-4 gap-2 font-medium flex items-center justify-center border border-zinc-200 shadow-md shadow-black/5 transition-colors hover:bg-zinc-50 rounded-lg cursor-pointer"
      >
        <Copy size={20} className="md:block hidden" />
        <span>Copy Sharable Link</span>
      </button>
      <button
        onClick={() => {
          if (typeof window === "undefined") return

          const url = window.location.href
          const text =
            "Check out my new Memoji Laptop Profile Picture! 🎉 Made by @flornkm"
          const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`

          window.open(twitterUrl, "_blank")
        }}
        className="h-10 md:w-auto w-full truncate px-4 gap-2 font-medium flex items-center justify-center border border-zinc-200 shadow-md shadow-black/5 transition-colors hover:bg-zinc-50 rounded-lg cursor-pointer"
      >
        <X size={20} />
      </button>
    </>
  )
}
