"use client"

import { SetStateAction, useEffect, useRef, useState } from "react"
import Draggable, { DraggableData, DraggableEvent } from "react-draggable"
import stickers from "@/public/sticker.json"
import { Plus, RotateRight, RotateLeft, Save, Smiley } from "@/components/Icons"
import Laptop from "@/illustrations/Laptop"
import * as rive from "@rive-app/canvas"

export default function StickerPlacer() {
  const [draggedSticker, setDraggedSticker] = useState<number | null>(null)
  const [dragPosition, setDragPosition] = useState<Record<string, number>[]>(
    stickers.map(() => ({ x: 0, y: 0, rotation: 0, zIndex: 0 }))
  )
  const laptopRef = useRef<HTMLDivElement>(null)
  const dissolveAnimation = useRef<HTMLCanvasElement>(null)

  const handleDragStart = (
    e: DraggableEvent,
    index: SetStateAction<number | null>
  ) => {
    setDraggedSticker(index)
    setDragPosition((prev) => {
      const next = [...prev]
      next[index as number] = {
        ...next[index as number],
        zIndex: Math.max(...next.map((sticker) => sticker.zIndex)) + 1,
      }
      return next
    })
  }

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    const laptop = laptopRef.current?.getBoundingClientRect()
    if (laptop) {
      if (data.node instanceof HTMLElement) {
        const stickerRect = data.node.getBoundingClientRect()
        if (
          stickerRect.left >= laptop.left &&
          stickerRect.right <= laptop.right &&
          stickerRect.top >= laptop.top &&
          stickerRect.bottom <= laptop.bottom
        ) {
          setDragPosition((prev) => {
            const next = [...prev]
            next[draggedSticker as number] = {
              x: data.x,
              y: data.y,
              rotation: next[draggedSticker as number].rotation,
              zIndex: next[draggedSticker as number].zIndex,
            }
            return next
          })
        } else {
          setDragPosition((prev) => {
            const next = [...prev]
            next[draggedSticker as number] = {
              x: data.x,
              y: data.y,
              rotation: next[draggedSticker as number].rotation,
            }
            return next
          })

          data.node.style.opacity = "0"

          // place canvas at the sticker position
          dissolveAnimation.current!.style.left = stickerRect.left + "px"
          dissolveAnimation.current!.style.top = stickerRect.top + "px"

          new rive.Rive({
            src: "/dissolve.riv",
            canvas: dissolveAnimation.current as HTMLCanvasElement,
            autoplay: true,
          })

          setTimeout(() => {
            setDragPosition((prev) => {
              const next = [...prev]
              next[draggedSticker as number] = {
                x: 0,
                y: 0,
                rotation: 0,
              }
              return next
            })
            data.node.style.opacity = "1"
          }, 500)
        }
      }
      setDraggedSticker(null)
    }
  }

  return (
    <>
      <div className="w-full h-full" ref={laptopRef}>
        <canvas
          className="fixed pointer-events-none"
          id="canvas"
          ref={dissolveAnimation}
          width="88"
          height="88"
          style={{ zIndex: 100, marginTop: "-20px", marginLeft: "-12px" }}
        ></canvas>
        <Laptop className="w-full h-full" />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-60 z-10 w-auto">
        <div className="bg-white border-t border-l border-zinc-200 rotate-45 absolute left-1/2 z-20 -translate-x-1/2 -top-3 rounded-tl-md w-6 aspect-square" />
        <div className="bg-white border border-zinc-200 p-2 w-screen max-w-sm rounded-xl relative shadow-lg">
          <div className="relative z-20 flex xs:justify-between flex-wrap gap-4 bg-zinc-100 rounded-lg p-2 mb-2">
            {stickers.map((sticker, index) => (
              <Draggable
                position={{
                  x: dragPosition[index]?.x || 0,
                  y: dragPosition[index]?.y || 0,
                }}
                key={index}
                onStart={(e) => handleDragStart(e, index)}
                onStop={handleDragStop}
                disabled={draggedSticker !== null && draggedSticker !== index}
              >
                <div
                  style={{
                    zIndex: dragPosition[index]?.zIndex || 0,
                  }}
                  className={
                    "flex items-center justify-center transition-opacity w-14 flex-shrink-0 aspect-square rounded-md relative group " +
                    (dragPosition[index]?.x === 0 &&
                    dragPosition[index]?.y === 0 &&
                    draggedSticker !== index
                      ? "hover:bg-zinc-200"
                      : "")
                  }
                >
                  <div
                    className={
                      "tooltip absolute bg-black text-white z-40 -top-8 flex gap-0.5 p-0.5 rounded-md transition-opacity md:opacity-0 " +
                      (dragPosition[index]?.x === 0 &&
                      dragPosition[index]?.y === 0
                        ? "pointer-events-none opacity-0"
                        : "md:group-hover:opacity-100")
                    }
                  >
                    <div className="w-4 bg-black rotate-45 aspect-square rounded-sm absolute left-1/2 -translate-x-1/2 -bottom-1" />
                    <button
                      onClick={() => {
                        setDragPosition((prev) => {
                          const next = [...prev]
                          next[index] = {
                            ...next[index],
                            rotation: next[index].rotation + 22.5,
                          }
                          return next
                        })
                      }}
                      className="w-7 aspect-square relative z-50 flex items-center justify-center transition-colors hover:bg-zinc-800 rounded-[4px]"
                    >
                      <RotateRight size={20} />
                    </button>
                    <button
                      onClick={() => {
                        setDragPosition((prev) => {
                          const next = [...prev]
                          next[index] = {
                            ...next[index],
                            rotation: next[index].rotation - 22.5,
                          }
                          return next
                        })
                      }}
                      className="w-7 aspect-square relative z-50 flex items-center justify-center transition-colors hover:bg-zinc-800 rounded-[4px]"
                    >
                      <RotateLeft size={20} />
                    </button>
                  </div>
                  <div
                    className="cursor-grab active:cursor-grabbing transition-all"
                    style={{
                      zIndex: 1,
                      transform: `rotate(${dragPosition[index]?.rotation}deg)`,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: sticker.data
                        .replace(/width="\d+"/g, 'width="100%"')
                        .replace(/height="\d+"/g, 'height="100%"'),
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
