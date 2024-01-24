import {
  getDownloadURL,
  getMetadata,
  getStorage,
  listAll,
  ref,
} from "firebase/storage"
import { Metadata } from "next"
import { app } from "@/lib/database"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  metadataBase: new URL("https://stickerimage.com"),
  title: "Latest Memoji Laptop Stickers - StickerImage",
  description:
    "Find a collection of the latest Memoji Laptop Stickers created with StickerImage.",
  openGraph: {
    images: "/images/stickerimage-latest.jpg",
  },
}

export default async function Imprint() {
  const images = await getImages()

  return (
    <main className="w-full min-h-screen flex items-start pt-40 justify-center overflow-x-hidden px-4">
      <div className="mx-auto md:max-w-sm flex flex-col gap-12 pb-24">
        <h1 className="text-xl font-semibold max-w-sm">
          Latest Memoji Laptop Stickers:
        </h1>
        {images.map((image) => {
          return (
            <div
              className="flex items-center justify-center mb-4"
              key={image.url}
            >
              <Link href={"/" + image.name} target="_blank">
                <Image
                  src={image.url}
                  className="rounded-xl"
                  width={500}
                  height={500}
                  alt={image.name}
                />
                <p className="text-center text-sm mt-4 text-zinc-500">
                  {image.name}
                </p>
              </Link>
            </div>
          )
        })}
      </div>
      <Link
        className="h-10 fixed bottom-8 truncate overflow-hidden px-4 gap-2 font-medium group flex items-center justify-center bg-black text-white shadow-md shadow-black/5 transition-colors hover:bg-zinc-800 rounded-lg"
        href="/"
      >
        Create your own
      </Link>
    </main>
  )
}

const getImages = async () => {
  const storage = getStorage(app)
  const storageRef = ref(storage, "images/")
  const results = await listAll(storageRef)

  const images = (await Promise.all(
    results.items.map(async (item) => {
      const metadata = await getMetadata(item)
      const created = metadata.timeCreated
      const name = metadata.name
      const url = await getDownloadURL(item)
      return { url, created, name }
    })
  )) as { url: string; created: string; name: string }[]

  images.sort((a, b) => {
    return new Date(b.created).getTime() - new Date(a.created).getTime()
  })

  return images.slice(0, 20)
}
