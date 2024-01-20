import StickerPlacer from "@/components/StickerPlacer"
import Pattern from "@/illustrations/Pattern"
import { app } from "@/lib/database"
import { getStorage, ref, uploadString } from "firebase/storage"

export default function Home() {
  return (
    <main className="w-full h-screen flex items-start pt-[12vw] justify-center overflow-x-hidden">
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
