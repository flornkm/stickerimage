import Buttons from "@/components/Buttons"
import Confetti from "@/components/Confetti"
import { ArrowLeft, Smiley } from "@/components/Icons"
import { app } from "@/lib/database"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import NewsletterSubscribe from "@/components/NewsletterSubscribe"

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id

  const image = await getImage(id).catch(() => {
    console.error("Image not found")
  })

  return {
    title: id + " | Memoji Laptop Sticker - StickerImage",
    description: "Generated Memoji Laptop Sticker Image with id " + id,
    metadataBase: new URL("https://stickerimage.com"),
    openGraph: {
      images: `/${id}/og/${encodeURIComponent(image as string)}`,
    },
  }
}

export default async function Page({ params, searchParams }: Props) {
  const created = searchParams.created
  const stickerImage = await getImage(params.id).catch(() => {
    console.error("Image not found")
  })

  if (!stickerImage) return notFound()

  return (
    <main className="w-full min-h-screen flex flex-col items-center pt-16 px-4 overflow-x-hidden pb-16">
      <div className="absolute pointer-events-none z-50 inset-0 flex items-start justify-center">
        {created && <Confetti />}
      </div>
      <h1 className="text-xl font-semibold mb-12 max-w-sm">
        Generated Memoji Laptop Sticker Image:
      </h1>
      <div className="p-4 rounded-3xl shadow-xl shadow-black/5 border border-zinc-200 bg-white -rotate-3 mb-16 animate-fall-in">
        <Image
          src={stickerImage}
          width={400}
          height={400}
          priority
          alt="Memoji Laptop Sticker"
          className="rounded-xl"
        />
        <div className="flex items-center justify-center pt-4">
          <h3 className="text-xl font-semibold font-display">
            ID: {params.id}
          </h3>
        </div>
      </div>
      {created ? (
        <NewsletterSubscribe
          subscribe={async (email: string) => {
            "use server"

            const response = await fetch(
              process.env.NEWSLETTER_HOOK as string,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: email,
                }),
              }
            )

            return response.status
          }}
        />
      ) : (
        <></>
      )}
      <div className="flex items-center gap-4 md:w-auto w-full md:flex-row flex-col">
        <Buttons image={await getImage(params.id)} />
      </div>
      <Link
        href="/"
        className="mt-16 font-medium hover:underline underline-offset-2 text-lg flex items-center"
      >
        {created ? (
          <ArrowLeft size={20} className="inline-block mr-2" />
        ) : (
          <Smiley size={20} className="inline-block mr-2" />
        )}
        {created ? "Generate another" : "Create your own"}
      </Link>
    </main>
  )
}

const getImage = async (id: string) => {
  const storage = getStorage(app)
  const storageRef = ref(storage, "images/" + id)

  const url = await getDownloadURL(storageRef)

  return url.toString()
}
