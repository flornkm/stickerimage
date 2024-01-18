import Pattern from "@/components/Pattern"
import stickers from "@/public/sticker.json"
import { Plus, Save, Smiley } from "@/components/Icons"

export default function Home() {
  return (
    <main className="w-full h-screen bg-white flex items-center justify-center">
      <div className="w-96 h-72 bg-white z-10 border border-zinc-200 relative">
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-60 z-10 w-auto">
          <div className="bg-white border-t border-l border-zinc-200 rotate-45 absolute left-1/2 z-20 -translate-x-1/2 -top-3 rounded-tl-md w-6 aspect-square" />
          <div className="bg-white border border-zinc-200 p-2 w-screen max-w-sm rounded-xl relative shadow-lg">
            <div className="relative z-20 flex xs:justify-between flex-wrap gap-4 bg-zinc-100 rounded-lg p-2 mb-2">
              {stickers.map((sticker, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-14 flex-shrink-0 aspect-square transition-all hover:bg-zinc-200 rounded-md"
                >
                  <div
                    className="cursor-grab active:cursor-grabbing"
                    dangerouslySetInnerHTML={{
                      __html: sticker.data.replace(
                        /width="\d+"/g,
                        'width="100%"'
                      ),
                    }}
                  />
                </div>
              ))}
              <div className="flex items-center justify-center w-14 flex-shrink-0 aspect-square">
                <button className="w-10 h-10 transition-all bg-black text-white rounded-md flex items-center justify-center hover:bg-zinc-800">
                  <Plus />
                </button>
              </div>
            </div>
            <div className="flex justify-between gap-3">
              <button className="h-10 w-full gap-2 font-medium flex items-center justify-center border border-zinc-200 shadow-md shadow-black/5 transition-colors hover:bg-zinc-50 rounded-lg">
                <Smiley size={20} />
                Replace Memoji
              </button>
              <button className="h-10 w-full gap-2 font-medium flex items-center justify-center bg-black text-white shadow-md shadow-black/5 transition-colors hover:bg-zinc-800 rounded-lg">
                <Save size={20} />
                Save Image
              </button>
            </div>
          </div>
        </div>
      </div>
      <Pattern className="pointer-events-none absolute inset-0" />
    </main>
  )
}
