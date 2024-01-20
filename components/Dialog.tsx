"use client"

import React, { useState } from "react"
import { createRoot } from "react-dom/client"

export default function Dialog(props: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true)
  const [animateIn, setAnimateIn] = useState(true)

  const hideDialog = () => {
    setAnimateIn(false)
    setTimeout(() => {
      setVisible(false)
    }, 300)
  }

  return (
    visible && (
      <div
        onClick={hideDialog}
        className="fixed inset-0 h-screen bg-black/10 z-50 w-full px-6 flex items-center justify-center"
      >
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          className={
            "px-6 py-4 bg-white border border-zinc-300 rounded-2xl pointer-events-auto w-full max-w-lg max-h-[70vh] overflow-y-scroll min-h-64 " +
            (animateIn ? "animate-scale-in" : "animate-scale-out")
          }
        >
          {props.children}
        </div>
      </div>
    )
  )
}

export const showDialog = (children: string | React.ReactNode) => {
  const dialogContainer = document.createElement("div")
  dialogContainer.id = "dialog-container"
  document.body.appendChild(dialogContainer)
  document.body.style.overflow = "hidden"

  const dialog = (
    <Dialog>
      {typeof children === "string" ? (
        <p className="text-zinc-800">{children}</p>
      ) : (
        children
      )}
    </Dialog>
  )

  const root = createRoot(dialogContainer)

  root.render(dialog)
}

export const hideDialog = () => {
  const dialogContainer = document.getElementById("dialog-container")
  if (dialogContainer) {
    const dialog = document.querySelector("#dialog-container > *")

    // Update the visibility state directly on the existing dialog component
    dialog && dialog.dispatchEvent(new CustomEvent("hideDialog"))

    document.body.removeChild(dialogContainer)
    document.body.style.overflow = "auto"
  }
}
