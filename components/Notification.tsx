import React, { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"

export default function Notification(props: {
  timer: number
  children: React.ReactNode
}) {
  const [hide, setHide] = useState(false)
  const [animateIn, setAnimateIn] = useState(true)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAnimateIn(false)

      setTimeout(() => {
        setHide(true)
      }, 300)
    }, props.timer)

    return () => clearTimeout(timeoutId)
  }, [props.timer])

  return (
    <div
      className={`fixed left-0 top-8 w-full px-6 flex items-center justify-center pointer-events-none ${
        animateIn ? "animate-fade-in-down" : "animate-fade-out-down"
      }`}
    >
      {!hide && (
        <div className="px-6 py-4 bg-white border border-zinc-200 rounded-xl pointer-events-auto">
          {props.children}
        </div>
      )}
    </div>
  )
}

export const showNotification = (message: string, timer: number = 5000) => {
  const notificationContainer = document.createElement("div")
  document.body.appendChild(notificationContainer)

  const removeNotificationContainer = () => {
    document.body.removeChild(notificationContainer)
  }

  const notification = (
    <Notification timer={timer}>
      <p className="text-zinc-800">{message}</p>
    </Notification>
  )

  createRoot(notificationContainer).render(notification)

  setTimeout(() => {
    const root = createRoot(notificationContainer)
    root.unmount()
    removeNotificationContainer()
  }, timer + 300) // Adding a small buffer time for the fade-out animation
}
