"use client"
import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "./Icons"

export default function SideInfo() {
  const [isInformationOpen, setInformationOpen] = useState(false)

  const toggleInformation = () => {
    setInformationOpen(!isInformationOpen)
  }

  return (
    <div className="md:absolute bottom-0 px-4 py-8 md:max-w-[200px] w-full">
      <h2 className="font-medium cursor-pointer" onClick={toggleInformation}>
        Information{" "}
        <ChevronDown
          size={20}
          className={
            "text-black mb-1 transition-transform hidden md:inline-block " +
            (isInformationOpen ? "transform rotate-180" : "")
          }
        />
      </h2>
      <div
        className={`text-sm ${
          isInformationOpen
            ? "max-h-screen opacity-100 my-2"
            : "md:max-h-0 md:opacity-0 my-1"
        } transition-all overflow-hidden`}
      >
        <p className="text-zinc-500 mb-6">
          Created by{" "}
          <Link
            href="https://x.com/flornkm"
            target="_blank"
            className="text-black font-medium underline underline-offset-2 hover:no-underline"
          >
            @flornkm
          </Link>
        </p>
        <h3 className="font-semibold mb-1">Built with</h3>
        <p className="text-zinc-500 mb-6">
          <Link
            href="https://nextjs.org"
            target="_blank"
            className="text-black font-medium underline underline-offset-2 hover:no-underline"
          >
            Next.js
          </Link>
          ,{" "}
          <Link
            href="https://firebase.google.com"
            target="_blank"
            className="text-black font-medium underline underline-offset-2 hover:no-underline"
          >
            Firebase
          </Link>{" "}
          and more, check out the{" "}
          <Link
            href="https://github.com/flornkm/memoji-laptop-sticker"
            target="_blank"
            className="text-black font-medium underline underline-offset-2 hover:no-underline"
          >
            Repo on GitHub
          </Link>
          .
        </p>
        <h3 className="font-semibold mb-1">Credit</h3>
        <p className="text-zinc-500 mb-6">
          All rights belong to their respective owners. This is a fan-made
          project and is not affiliated with Apple or any other company. <br />{" "}
          <br />
          I&apos;m not responsible for any misuse of this service. I really like
          all the brands and companies I&apos;m using in this project.
          <br /> <br />
          If you want your Memoji removed, please contact me on X:{" "}
          <Link
            href="https://x.com/flornkm"
            target="_blank"
            className="text-black font-medium underline underline-offset-2 hover:no-underline"
          >
            @flornkm
          </Link>
        </p>
      </div>
      <Link
        className="font-medium cursor-pointer hover:underline underline-offset-2"
        href="/imprint"
        target="_blank"
      >
        Imprint
      </Link>
    </div>
  )
}
