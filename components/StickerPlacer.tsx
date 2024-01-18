"use client"

import { SetStateAction, useRef, useState } from "react"
import Draggable, { DraggableData, DraggableEvent } from "react-draggable"
import stickers from "@/public/sticker.json"
import { Plus, Save, Smiley } from "@/components/Icons"
import Laptop from "@/illustrations/Laptop"

export default function StickerPlacer() {
  const [draggedSticker, setDraggedSticker] = useState<number | null>(null)
  const [lastPosition, setLastPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const laptopRef = useRef<HTMLDivElement>(null)

  const handleDragStart = (
    e: DraggableEvent,
    data: DraggableData,
    index: SetStateAction<number | null>
  ) => {
    setDraggedSticker(index)
    setLastPosition({ x: data.x, y: data.y })
  }

  const handleDragStop = (
    e: DraggableEvent,
    data: { x: number; y: number }
  ) => {
    const laptop = laptopRef.current?.getBoundingClientRect()
    if (laptop) {
      const stickerRef = e.target as HTMLElement

      if (stickerRef) {
        const stickerRect = stickerRef.getBoundingClientRect()

        if (
          stickerRect.left >= laptop.left &&
          stickerRect.right <= laptop.right &&
          stickerRect.top >= laptop.top &&
          stickerRect.bottom <= laptop.bottom
        ) {
          setDraggedSticker(null)
        } else {
          // The sticker is outside the laptop. Reset its position.

          if (lastPosition) {
            setDraggedSticker(null)
            // Reset the transformation matrix to the identity matrix.
            stickerRef.style.transform = "matrix(1, 0, 0, 1, 0, 0)"
          }
        }
      }
    }
  }

  return (
    <>
      <div className="w-full h-full" ref={laptopRef}>
        <Laptop className="w-full h-full" />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-60 z-10 w-auto">
        <div className="bg-white border-t border-l border-zinc-200 rotate-45 absolute left-1/2 z-20 -translate-x-1/2 -top-3 rounded-tl-md w-6 aspect-square" />
        <div className="bg-white border border-zinc-200 p-2 w-screen max-w-sm rounded-xl relative shadow-lg">
          <div className="relative z-20 flex xs:justify-between flex-wrap gap-4 bg-zinc-100 rounded-lg p-2 mb-2">
            {stickers.map((sticker, index) => (
              <Draggable
                key={index}
                onStart={(e) => handleDragStart(e, index)}
                onStop={handleDragStop}
                disabled={draggedSticker !== null && draggedSticker !== index}
              >
                <div
                  className={
                    "flex items-center justify-center w-14 flex-shrink-0 aspect-square rounded-md relative " +
                    (draggedSticker !== null && draggedSticker !== index
                      ? "opacity-50 "
                      : "")
                  }
                >
                  <div
                    className="cursor-grab active:cursor-grabbing"
                    dangerouslySetInnerHTML={{
                      __html: sticker.data
                        .replace(/width="\d+"/g, 'width="100%"')
                        .replace(/height="\d+"/g, 'height="100%"')
                        // .replace(
                        //   /<svg/,
                        //   '<svg stroke="#fff" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"'
                        // )
                        .replace(/clip-path="url\([^"]+\)"/g, ""),
                    }}
                  />
                </div>
              </Draggable>
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
    </>
  )
}
