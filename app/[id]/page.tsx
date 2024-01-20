import StickerPlacer from "@/components/StickerPlacer"
import Pattern from "@/illustrations/Pattern"
import { app } from "@/lib/database"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import Image from "next/image"

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <main className="w-full h-screen bg-white flex items-start pt-[12vw] justify-center overflow-x-hidden">
      <Image
        src={await getImage(params.id)}
        width={400}
        height={400}
        priority
        alt="Memoji Laptop Sticker"
      />
    </main>
  )
}

const getImage = async (id: string) => {
  const storage = getStorage(app)
  const storageRef = ref(storage, "images/" + id)

  const url = await getDownloadURL(storageRef)

  return url
}
