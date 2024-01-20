import Link from "next/link"

export default function NotFound() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center max-w-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Couldn&apos;t find your page
        </h2>
        <p className="mb-6 text-zinc-500 text-center">
          We searched everywhere but couldn&apos;t find the page you were
          looking for.
          <br />
          <br />
          If you encountered this page by a bug, please report it to me, the
          creator of it, on X:{" "}
          <Link
            href="https://x.com/flornkm"
            target="_blank"
            className="text-black font-medium underline underline-offset-2 hover:no-underline"
          >
            @flornkm
          </Link>
        </p>
        <Link
          href="/"
          className="h-10 truncate px-4 gap-2 md:w-auto w-full font-medium flex items-center justify-center bg-black text-white shadow-md shadow-black/5 transition-colors hover:bg-zinc-800 rounded-lg"
        >
          Return Home
        </Link>
      </div>
    </main>
  )
}
