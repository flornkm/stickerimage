import Link from "next/link"

export default function Banner() {
  return (
    <Link
      href="https://www.producthunt.com/posts/memoji-laptop-sticker-maker"
      target="_blank"
      className="fixed top-0 w-screen z-50 bg-[#FF6154] text-white font-medium text-center py-2 px-4"
    >
      <p className="truncate py-1">
        This project is currently live on Product Hunt! I would love your
        support.
        <span className="bg-white ml-2 text-[#FF6154] px-2 py-1 rounded-full hover:text-white hover:bg-transparent transition-all">
          Click here to check it out
        </span>
      </p>
    </Link>
  )
}
