import StickerPlacer from "@/components/StickerPlacer"
import { app } from "@/lib/database"
import { getStorage, ref, uploadString } from "firebase/storage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Memoji Laptop Sticker Maker - StickerImage",
  description:
    "Make your own Laptop full of Stickers: Create your own Memoji Laptop Sticker image and share it with your friends.",
  openGraph: {
    images: "/stickerimage-og.png",
  },
}

export default function Home() {
  return (
    <main className="w-full min-h-screen flex items-start pt-[12vw] justify-center overflow-x-hidden md:mb-0 mb-16">
      <div className="w-96 h-72 z-10 relative">
        <StickerPlacer
          uploadImage={async (dataUrl: string): Promise<string> => {
            "use server"

            const storage = getStorage(app)
            const uniqueID = Math.random().toString(36).substring(2, 15)
            const storageRef = ref(storage, "images/" + uniqueID)

            await uploadString(storageRef, dataUrl, "data_url", {
              contentType: "image/png",
            }).then(() => {
              return uniqueID
            })

            return uniqueID
          }}
        />
      </div>
    </main>
  )
}
