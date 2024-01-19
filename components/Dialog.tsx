"use client"

import React, { useState } from "react"
import { createRoot } from "react-dom/client"

export default function Dialog(props: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true)

  const hideDialog = () => {
    setVisible(false)
  }

  return (
    visible && (
      <div
        onClick={hideDialog}
        className={`fixed inset-0 h-screen bg-black/10 z-50 w-full px-6 flex items-center justify-center animate-fade-in-down`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="px-6 py-4 bg-white border border-zinc-300 rounded-2xl pointer-events-auto w-full max-w-lg max-h-[90vh] overflow-y-scroll min-h-64"
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
  }
}
