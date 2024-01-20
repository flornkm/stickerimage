import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(
  _req: NextRequest,
  req: { params: { image: string } }
) {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img alt="default" src={req.params.image} width={400} height={400} />
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  )
}
