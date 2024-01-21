"use client"

import { SetStateAction, useRef, useState } from "react"
import Draggable, { DraggableData, DraggableEvent } from "react-draggable"
import stickerData from "@/public/sticker.json"
import {
  Plus,
  RotateRight,
  RotateLeft,
  Save,
  Smiley,
  File,
} from "@/components/Icons"
import Laptop from "@/illustrations/Laptop"
import * as rive from "@rive-app/canvas"
import { showNotification } from "./Notification"
import NextImage from "next/image"
import * as htmlToImage from "html-to-image"
import { hideDialog, showDialog } from "./Dialog"

export default function StickerPlacer({
  uploadImage,
}: {
  uploadImage: (dataUrl: string) => Promise<string>
}) {
  const [stickerState, setStickerState] = useState(
    stickerData.map((sticker, index) => ({
      ...sticker,
      custom: false,
      position: { x: 0, y: 0, rotation: 0, zIndex: index },
    }))
  )
  const [draggedSticker, setDraggedSticker] = useState<number | null>(null)
  const [memoji, setMemoji] = useState<string>("/default-memoji.png")
  const [loadImage, setLoadImage] = useState(false)

  const laptopRef = useRef<HTMLDivElement>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
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
            src: "/animations.riv",
            artboard: "dissolve",
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

          console.log(stickerRect)

          dissolveAnimation.current!.style.left = stickerRect.left + "px"
          dissolveAnimation.current!.style.top = stickerRect.top + "px"

          new rive.Rive({
            src: "/animations.riv",
            artboard: "dissolve",
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

  const handleStickerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      if (file?.type !== "image/svg+xml") {
        return showNotification(
          "Error: Please upload a valid SVG file (max. 48 x 48 px)."
        )
      }

      const reader = new FileReader()
      reader.readAsText(file)

      loadSvg(URL.createObjectURL(file)).then((svg) => {
        if (!svg.documentElement || svg.documentElement.tagName !== "svg") {
          return showNotification(
            "Error: Please upload a valid SVG file (max. 48 x 48 px)."
          )
        }

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

  const replaceMemoji = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = () => {
      setMemoji(reader.result as string)
    }
  }

  const handleMemojiUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        return showNotification(
          "Error: Please upload a valid PNG or JPEG file for the memoji."
        )
      }

      const img = new Image()

      img.src = URL.createObjectURL(file)
      img.onload = () => {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height

        const context = canvas.getContext("2d")
        context!.drawImage(img, 0, 0)

        const data = context!.getImageData(0, 0, img.width, img.height)
          .data as Uint8ClampedArray

        const r = data[0]
        const g = data[1]
        const b = data[2]

        const rgb = `rgb(${r}, ${g}, ${b})`

        if (r === 0 && g === 0 && b === 0)
          return (screenRef.current!.style.backgroundColor = "transparent")

        screenRef.current!.style.backgroundColor = rgb
      }

      replaceMemoji(file)
    } else {
      showNotification(
        "Error: Please upload a valid PNG or JPEG file for the memoji."
      )
    }
  }

  const saveImage = async () => {
    if (
      stickerState.every(
        (sticker) =>
          sticker.position.x === 0 &&
          sticker.position.y === 0 &&
          sticker.custom === false
      ) &&
      memoji === "/default-memoji.png"
    )
      return showNotification(
        "Error: Please add at least one sticker to the laptop."
      )

    setLoadImage(true)

    const safari =
      typeof window !== "undefined" &&
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

    if (safari) {
      await htmlToImage.toPng(screenRef.current as HTMLDivElement)
      await htmlToImage.toPng(screenRef.current as HTMLDivElement)
      await htmlToImage.toPng(screenRef.current as HTMLDivElement)
    }

    htmlToImage
      .toPng(screenRef.current as HTMLDivElement)
      .then(async function (dataUrl) {
        uploadImage(dataUrl).then((id) => {
          window.location.href = `/${id}?created=true`
        })
      })
      .catch(function (error) {
        console.error("Error capturing the image:", error)
      })
  }

  return (
    <div ref={screenRef}>
      <div className="w-full h-full relative">
        <canvas
          className="fixed pointer-events-none"
          id="canvas"
          ref={dissolveAnimation}
          width="88"
          height="88"
          style={{ zIndex: 100, marginTop: "-20px", marginLeft: "-12px" }}
        ></canvas>
        <div className="w-full flex flex-col-reverse aspect-square">
          <div ref={laptopRef} className="relative z-10">
            <Laptop className="w-full h-full bottom-0 flex-shrink-0" />
            {stickerState.length > 9 &&
              stickerState.map((sticker, index) => {
                if (index >= 9)
                  return (
                    <div
                      key={sticker.name}
                      className="absolute z-50 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none"
                    >
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
          <NextImage
            src={memoji}
            priority
            alt="Memoji"
            width={512}
            height={512}
            className="absolute object-contain top-0 left-1/2 -translate-x-1/2 md:w-48 xs:w-44 w-[50vw] h-auto"
          />
        </div>
      </div>
      <div
        className="absolute left-1/2 -translate-x-1/2 xs:-bottom-[400px] -bottom-[450px] md:bottom-0 md:translate-y-[332px] z-10 w-auto"
        ref={toolbarRef}
      >
        <div className="bg-white border-t border-l border-zinc-200 rotate-45 absolute left-1/2 z-20 -translate-x-1/2 -top-3 rounded-tl-md w-6 aspect-square" />
        <div className="bg-white border border-zinc-200 p-2 w-screen max-w-sm rounded-xl relative shadow-lg">
          <div className="relative z-20 flex xs:justify-between justify-center flex-wrap gap-4 bg-zinc-100 rounded-lg p-2 mb-2">
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
                onChange={handleStickerUpload}
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
          <div className="flex md:flex-row flex-col justify-between gap-3">
            <button
              onClick={() =>
                showDialog(
                  <div className="w-full h-full">
                    <h2 className="text-lg font-semibold mb-4">
                      How to upload
                    </h2>
                    <p className="text-zinc-500 mb-6">
                      It is easy. Just open iMessage or another app where you
                      can preview your Memoji. Open it, make a screenshot and
                      cut out to the edges of the Memoji. Then upload it here.
                      <br /> <br />
                      The background color of the Memoji will be used as the
                      background color of the screen.
                    </p>
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => {
                        handleMemojiUpload(e).then(() => {
                          hideDialog()
                        })
                      }}
                      id="memojiInput"
                      className="hidden"
                    />
                    <label
                      htmlFor="memojiInput"
                      className="h-10 mb-4 w-full gap-2 font-medium flex items-center justify-center shadow-md shadow-black/5 transition-colors bg-black rounded-lg cursor-pointer text-white hover:bg-zinc-800"
                    >
                      <File size={20} />
                      Choose File
                    </label>
                    <NextImage
                      src="/how-to-screenshot.jpg"
                      alt="How to upload"
                      width={1280}
                      height={720}
                      className="rounded-lg mb-6"
                    />
                  </div>
                )
              }
              className="h-10 truncate w-full gap-2 font-medium flex items-center justify-center border border-zinc-200 shadow-md shadow-black/5 transition-colors hover:bg-zinc-50 rounded-lg cursor-pointer"
            >
              <Smiley size={20} className="md:block hidden" />
              <span>Replace Memoji</span>
            </button>
            <button
              onClick={saveImage}
              className="h-10 truncate overflow-hidden w-full gap-2 font-medium group flex items-center justify-center bg-black text-white shadow-md shadow-black/5 transition-colors hover:bg-zinc-800 rounded-lg"
            >
              {loadImage ? (
                <div className="w-6 h-6 border-2 border-white rounded-full animate-spin relative">
                  <div className="w-2/3 h-2/3 absolute bg-black transition-colors group-hover:bg-zinc-800 z-10 -top-1 -left-1" />
                </div>
              ) : (
                <Save size={20} className="md:block hidden" />
              )}
              <span>Save Image</span>
            </button>
          </div>
        </div>
      </div>
    </div>
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
  const rotateWithTwoFingers = (e: React.TouchEvent<HTMLDivElement>) => {
    const firstTouch = e.touches[0]
    const secondTouch = e.touches[1]

    const firstTouchX = firstTouch.clientX
    const firstTouchY = firstTouch.clientY
    const secondTouchX = secondTouch.clientX
    const secondTouchY = secondTouch.clientY

    const x = firstTouchX - secondTouchX
    const y = firstTouchY - secondTouchY

    const angle = Math.atan2(y, x) * (180 / Math.PI)

    setStickerState((prev) => {
      const next = [...prev]
      next[index] = {
        ...next[index],
        position: {
          ...next[index].position,
          rotation: angle,
        },
      }
      return next
    })
  }

  return (
    <Draggable
      position={{
        x: sticker.position?.x || 0,
        y: sticker.position?.y || 0,
      }}
      onStart={(e) => handleDragStart(e, index)}
      onStop={handleDragStop}
      disabled={draggedSticker !== null && draggedSticker !== index}
    >
      <div
        onTouchStart={(e) => {
          if (e.touches.length === 2) {
            rotateWithTwoFingers(e)
          }
        }}
        onTouchMove={(e) => {
          if (e.touches.length === 2) {
            rotateWithTwoFingers(e)
          }
        }}
        style={{
          zIndex: sticker.position?.zIndex || 0,
          touchAction: "none",
          userSelect: "none",
          pointerEvents: "auto",
        }}
        className={
          "cursor-grab pointer-events-auto active:cursor-grabbing flex items-center justify-center transition-opacity w-14 flex-shrink-0 aspect-square rounded-md relative group " +
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
              "tooltip absolute z-[60] bg-black text-white hidden md:group-hover:flex gap-0.5 p-0.5 rounded-md " +
              (sticker.position.y < -230 && index < 5
                ? "-bottom-8"
                : sticker.position.y < -320 && index > 4 && index < 9
                ? "-bottom-8"
                : sticker.position.y < -50 && sticker.custom
                ? "-bottom-8"
                : "-top-8")
            }
          >
            <div
              className={
                "w-4 bg-black rotate-45 aspect-square rounded-sm absolute left-1/2 -translate-x-1/2 " +
                (sticker.position.y < -230 && index < 5
                  ? "-top-1"
                  : sticker.position.y < -320 && index > 4 && index < 9
                  ? "-top-1"
                  : sticker.position.y < -50 && sticker.custom
                  ? "-top-1"
                  : "-bottom-1")
              }
            />
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
          className="transition-all lg:pointer-events-auto pointer-events-none"
          style={{
            // zIndex: sticker.position?.zIndex || 0,
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
