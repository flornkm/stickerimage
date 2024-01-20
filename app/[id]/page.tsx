import Buttons from "@/components/Buttons"
import { ArrowLeft } from "@/components/Icons"
import { app } from "@/lib/database"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import Image from "next/image"
import Link from "next/link"

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <main className="w-full h-screen flex flex-col items-center pt-16 px-4 overflow-x-hidden">
      <h1 className="text-xl font-semibold mb-12 max-w-sm">
        Your generated Memoji Laptop Sticker Image:
      </h1>
      <div className="p-4 rounded-3xl shadow-xl shadow-black/5 border border-zinc-200 bg-white -rotate-3 mb-16 animate-fall-in">
        <Image
          src={await getImage(params.id)}
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
      <div className="flex items-center gap-4 md:w-auto w-full md:flex-row flex-col">
        <Buttons image={await getImage(params.id)} />
      </div>
      <Link
        href="/"
        className="mt-16 font-medium hover:underline underline-offset-2 text-lg flex items-center"
      >
        <ArrowLeft size={20} className="inline-block mr-3" />
        Generate another
      </Link>
    </main>
  )
}

const getImage = async (id: string) => {
  const storage = getStorage(app)
  const storageRef = ref(storage, "images/" + id)

  const url = await getDownloadURL(storageRef)

  return url
}
