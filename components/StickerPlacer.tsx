"use client"

import { SetStateAction, useRef, useState } from "react"
import Draggable, { DraggableData, DraggableEvent } from "react-draggable"
import stickerData from "@/public/sticker.json"
import { Plus, RotateRight, RotateLeft, Save, Smiley } from "@/components/Icons"
import Laptop from "@/illustrations/Laptop"
import * as rive from "@rive-app/canvas"
import Notification, { showNotification } from "./Notification"

export default function StickerPlacer() {
  const [stickerState, setStickerState] = useState(
    stickerData.map((sticker, index) => ({
      ...sticker,
      custom: false,
      position: { x: 0, y: 0, rotation: 0, zIndex: index },
    }))
  )
  const [draggedSticker, setDraggedSticker] = useState<number | null>(null)

  const laptopRef = useRef<HTMLDivElement>(null)
  const dissolveAnimation = useRef<HTMLCanvasElement>(null)

  const handleDragStart = (
    e: DraggableEvent,
    index: SetStateAction<number | null>
  ) => {
    setDraggedSticker(index)
    setStickerState((prev) => {
      const next = [...prev]
      next[index as number] = {
        ...next[index as number],
        position: {
          ...next[index as number].position,
          zIndex:
            Math.max(...next.map((sticker) => sticker.position.zIndex)) + 1,
        },
      }
      return next
    })
  }

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    const laptop = laptopRef.current?.getBoundingClientRect()
    if (laptop) {
      const stickerIndex = draggedSticker as number
      const currentSticker = stickerState[stickerIndex]

      if (data.node instanceof HTMLElement) {
        const stickerRect = data.node.getBoundingClientRect()
        if (
          stickerRect.left >= laptop.left &&
          stickerRect.right <= laptop.right &&
          stickerRect.top >= laptop.top &&
          stickerRect.bottom <= laptop.bottom
        ) {
          setStickerState((prev) => {
            const next = [...prev]
            next[stickerIndex] = {
              ...currentSticker,
              position: {
                x: data.x,
                y: data.y,
                rotation: currentSticker.position.rotation,
                zIndex: currentSticker.position.zIndex,
              },
            }
            return next
          })
        } else if (!currentSticker.custom) {
          setStickerState((prev) => {
            const next = [...prev]
            next[stickerIndex] = {
              ...currentSticker,
              position: {
                ...currentSticker.position,
                x: 0,
                y: 0,
                rotation: 0,
              },
            }
            return next
          })

          data.node.style.transition = "opacity 0s"
          data.node.style.opacity = "0"
          data.node.style.transform = "rotate(0deg)"

          dissolveAnimation.current!.style.left = stickerRect.left + "px"
          dissolveAnimation.current!.style.top = stickerRect.top + "px"

          new rive.Rive({
            src: "/dissolve.riv",
            canvas: dissolveAnimation.current as HTMLCanvasElement,
            autoplay: true,
          })

          setTimeout(() => {
            setStickerState((prev) => {
              const next = [...prev]
              next[stickerIndex] = {
                ...currentSticker,
                position: {
                  ...currentSticker.position,
                  x: 0,
                  y: 0,
                  rotation: 0,
                },
              }
              return next
            })
            data.node.style.transition = "opacity 0.3s"
            data.node.style.opacity = "1"
          }, 300)
        } else {
          setStickerState((prev) => {
            const next = [...prev]
            next.splice(stickerIndex, 1)
            return next
          })

          dissolveAnimation.current!.style.left = stickerRect.left + "px"
          dissolveAnimation.current!.style.top = stickerRect.top + "px"

          new rive.Rive({
            src: "/dissolve.riv",
            canvas: dissolveAnimation.current as HTMLCanvasElement,
            autoplay: true,
          })
        }
      }
      setDraggedSticker(null)
    }
  }

  const stickerIsOnLaptop = (x: number, y: number) => {
    const laptop = laptopRef.current?.getBoundingClientRect()

    if (x === 0 && y === 0) return false

    if (laptop) {
      const mouse = {
        x: (window.event as MouseEvent).clientX,
        y: (window.event as MouseEvent).clientY,
      }

      if (
        mouse.x < laptop.right &&
        mouse.x > laptop.left &&
        mouse.y < laptop.bottom &&
        mouse.y > laptop.top
      ) {
        return true
      }
    }
    return false
  }

  const loadSvg = async (url: string) => {
    return fetch(url)
      .then(function (response) {
        return response.text()
      })
      .then(function (raw) {
        return new window.DOMParser().parseFromString(raw, "image/svg+xml")
      })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsText(file)

      loadSvg(URL.createObjectURL(file)).then((svg) => {
        const svgProps = {
          width: Number(
            svg.documentElement.getAttribute("width")?.replace("px", "")
          ),
          height: Number(
            svg.documentElement.getAttribute("height")?.replace("px", "")
          ),
        }

        if (svgProps.width > 48 || svgProps.height > 48) {
          return showNotification(
            "Error: SVG file dimensions should be 48 pixels or smaller."
          )
        }

        if (
          stickerState.find(
            (sticker) =>
              sticker.position.x === 0 &&
              sticker.position.y === 0 &&
              sticker.custom === true
          )
        )
          return showNotification(
            "Error: You need to move the existing custom sticker first."
          )

        const svgString = svg.documentElement.outerHTML

        setStickerState((prev) => [
          ...prev,
          {
            data: svgString,
            name: file.name,
            custom: true,
            position: {
              x: 0,
              y: 0,
              rotation: 0,
              zIndex:
                Math.max(...prev.map((sticker) => sticker.position.zIndex)) + 1,
            },
          },
        ])
      })
    }
  }

  return (
    <>
      <div className="w-full h-full relative" ref={laptopRef}>
        <canvas
          className="fixed pointer-events-none"
          id="canvas"
          ref={dissolveAnimation}
          width="88"
          height="88"
          style={{ zIndex: 100, marginTop: "-20px", marginLeft: "-12px" }}
        ></canvas>
        <div className="relative">
          <Laptop className="w-full h-full" />
          {/* Render stickers inside laptop div */}
          {stickerState.length > 9 &&
            stickerState.map((sticker, index) => {
              if (index >= 9)
                return (
                  <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <Sticker
                      sticker={sticker}
                      index={index}
                      handleDragStart={handleDragStart}
                      handleDragStop={handleDragStop}
                      draggedSticker={draggedSticker}
                      setStickerState={setStickerState}
                      stickerIsOnLaptop={stickerIsOnLaptop}
                    />
                  </div>
                )
            })}
        </div>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-60 z-10 w-auto">
        <div className="bg-white border-t border-l border-zinc-200 rotate-45 absolute left-1/2 z-20 -translate-x-1/2 -top-3 rounded-tl-md w-6 aspect-square" />
        <div className="bg-white border border-zinc-200 p-2 w-screen max-w-sm rounded-xl relative shadow-lg">
          <div className="relative z-20 flex xs:justify-between flex-wrap gap-4 bg-zinc-100 max-h-40 rounded-lg p-2 mb-2">
            {stickerState.map((sticker, index) => {
              if (index < 9)
                return (
                  <Sticker
                    sticker={sticker}
                    index={index}
                    handleDragStart={handleDragStart}
                    handleDragStop={handleDragStop}
                    draggedSticker={draggedSticker}
                    setStickerState={setStickerState}
                    stickerIsOnLaptop={stickerIsOnLaptop}
                  />
                )
            })}
            <div className="flex items-center justify-center group w-14 flex-shrink-0 aspect-square relative">
              <input
                type="file"
                accept=".svg"
                onChange={handleFileUpload}
                id="fileInput"
                className="absolute z-10 inset-0 opacity-0 cursor-pointer"
              />
              <label
                htmlFor="fileInput"
                className="flex items-center justify-center w-14 flex-shrink-0 aspect-square cursor-pointer relative z-20"
              >
                <button className="w-10 h-10 transition-all pointer-events-none bg-black text-white rounded-md flex items-center justify-center group-hover:bg-zinc-800">
                  <Plus />
                </button>
              </label>
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

function Sticker({
  sticker,
  index,
  handleDragStart,
  handleDragStop,
  draggedSticker,
  setStickerState,
  stickerIsOnLaptop,
}: {
  sticker: {
    data: string
    name: string
    custom: boolean
    position: {
      x: number
      y: number
      rotation: number
      zIndex: number
    }
  }
  index: number
  handleDragStart: (
    e: DraggableEvent,
    index: SetStateAction<number | null>
  ) => void
  handleDragStop: (e: DraggableEvent, data: DraggableData) => void
  draggedSticker: number | null
  setStickerState: React.Dispatch<
    React.SetStateAction<
      {
        data: string
        name: string
        custom: boolean
        position: {
          x: number
          y: number
          rotation: number
          zIndex: number
        }
      }[]
    >
  >
  stickerIsOnLaptop: (x: number, y: number) => boolean
}) {
  return (
    <Draggable
      position={{
        x: sticker.position?.x || 0,
        y: sticker.position?.y || 0,
      }}
      key={sticker.name}
      onStart={(e) => handleDragStart(e, index)}
      onStop={handleDragStop}
      disabled={draggedSticker !== null && draggedSticker !== index}
    >
      <div
        style={{
          zIndex: sticker.position?.zIndex || 0,
        }}
        className={
          "cursor-grab active:cursor-grabbing flex items-center justify-center transition-opacity w-14 flex-shrink-0 aspect-square rounded-md relative group " +
          (sticker.position?.x === 0 &&
          sticker.position?.y === 0 &&
          draggedSticker !== index &&
          !sticker.custom
            ? "hover:bg-zinc-200"
            : "")
        }
      >
        {(stickerIsOnLaptop(sticker.position.x || 0, sticker.position.y || 0) ||
          sticker.custom) && (
          <div
            className={
              "tooltip absolute bg-black text-white z-40 hidden group-hover:flex -top-8 gap-0.5 p-0.5 rounded-md"
            }
          >
            <div className="w-4 bg-black rotate-45 aspect-square rounded-sm absolute left-1/2 -translate-x-1/2 -bottom-1" />
            <button
              onClick={() => {
                setStickerState((prev) => {
                  const next = [...prev]
                  next[index] = {
                    ...next[index],
                    position: {
                      rotation: next[index].position.rotation + 22.5,
                      x: next[index].position.x,
                      y: next[index].position.y,
                      zIndex: next[index].position.zIndex,
                    },
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
                setStickerState((prev) => {
                  const next = [...prev]
                  next[index] = {
                    ...next[index],
                    position: {
                      rotation: next[index].position.rotation - 22.5,
                      x: next[index].position.x,
                      y: next[index].position.y,
                      zIndex: next[index].position.zIndex,
                    },
                  }
                  return next
                })
              }}
              className="w-7 aspect-square relative z-50 flex items-center justify-center transition-colors hover:bg-zinc-800 rounded-[4px]"
            >
              <RotateLeft size={20} />
            </button>
          </div>
        )}
        <div
          className="transition-all"
          style={{
            zIndex: sticker.position?.zIndex || 0,
            transform: `rotate(${sticker.position?.rotation}deg)`,
          }}
          dangerouslySetInnerHTML={{
            __html: sticker.data
              .replace(/width="\d+"/g, 'width="100%"')
              .replace(/height="\d+"/g, 'height="100%"'),
          }}
        />
      </div>
    </Draggable>
  )
}
