import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(
  _req: NextRequest,
  req: { params: { id: string; image: string } }
) {
  // Load font
  const interSemiBold = fetch(
    new URL("./assets/Inter-SemiBold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          padding: 40,
          paddingTop: 64,
          paddingLeft: 128,
          paddingRight: 128,
        }}
      >
        <h1 style={{ fontSize: 40 }}>Laptop Sticker Image</h1>
        <p style={{ fontSize: 32, color: "#71717a" }}>
          <strong style={{ marginRight: 8 }}>ID:</strong>
          {req.params.id}
        </p>
        <div
          style={{
            borderRadius: 16,
            border: "1px solid #e5e5e7",
            padding: 8,
            backgroundColor: "white",
            display: "flex",
            position: "absolute",
            top: "60%",
            right: 128,
            transform: "rotate(-3deg) translateY(-50%)",
            marginLeft: "auto",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.05)",
            marginBottom: 40,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="default"
            style={{ borderRadius: 8 }}
            src={req.params.image}
            width={400}
            height={400}
          />
        </div>
        <p
          style={{
            fontSize: 32,
            position: "absolute",
            bottom: 72,
            left: 128,
            width: 300,
          }}
        >
          Create your own at stickerimage.com
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          data: await interSemiBold,
          name: "Inter",
          style: "normal",
          weight: 600,
        },
      ],
    }
  )
}
