import { ArrowLeft } from "@/components/Icons"
import StickerPlacer from "@/components/StickerPlacer"
import Pattern from "@/illustrations/Pattern"
import { app } from "@/lib/database"
import { getStorage, ref, uploadString } from "firebase/storage"
import Link from "next/link"

export default function Imprint() {
  return (
    <main className="w-full h-screen flex items-start pt-[12vw] justify-center overflow-x-hidden px-4">
      <div className="mx-auto max-w-sm pb-4">
        <Link
          href="/"
          className="mb-6 font-medium hover:underline underline-offset-2 flex items-center"
        >
          <ArrowLeft size={20} className="inline-block mr-3" />
          Back to Home
        </Link>
        <h2 className="font-semibold mb-4">
          Information according to German §5 of TMG
        </h2>
        <p className="mb-4">
          Florian Kiem <br />
          Fischerinsel 13
          <br />
          10179 Berlin <br />
          Germany <br />
        </p>
        <p className="text-zinc-500 mb-12">
          Please only contact me via{" "}
          <Link
            href="mailto:hello@floriankiem.com"
            className="text-black font-medium underline underline-offset-2 hover:no-underline"
          >
            hello@floriankiem.com
          </Link>
          .
        </p>
        <h3 className="font-semibold mb-1">Copyright</h3>
        <p className="text-zinc-500 mb-12">
          This website and its contents are subject to German copyright law.
          Unless expressly permitted by law (§ 44a et seq. of the copyright
          law), every form of utilizing, reproducing or processing works subject
          to copyright protection on this website requires my prior consents.
          Individual reproductions of a work are allowed only for private use,
          so must not serve either directly or indirectly for earnings.
          Unauthorized utilization of copyrighted works is punishable (§ 106 of
          the copyright law).
        </p>
        <h3 className="font-semibold mb-1">Credit</h3>
        <p className="text-zinc-500 mb-12">
          All rights belong to their respective owners. This is a fan-made
          project and is not affiliated with Apple or any other company. <br />{" "}
          <br />
          I&apos;m not responsible for any misuse of this service. I really like
          all the brands and companies I&apos;m using in this project.
          <br /> <br />
          If you want your Memoji removed, please contact me on X:{" "}
          <Link
            href="https://x.com/flornkm"
            target="_blank"
            className="text-black font-medium underline underline-offset-2 hover:no-underline"
          >
            @flornkm
          </Link>
        </p>
        <h3 className="font-semibold mb-1">Disclaimer</h3>
        <p className="text-zinc-500 mb-12">
          The contents of this website have been created with my best knowledge
          and utmost care. I cannot guarantee the contents’ accuracy,
          completeness, or topicality. According to statutory provisions, I’m
          furthermore responsible for my own content. In this context, please
          note that I’m accordingly not obliged to monitor merely the
          transmitted or saved information of third parties, or investigate
          circumstances pointing to illegal activity. My obligation to remove or
          block the use of information under generally applic­able laws remain
          unaffected by this as per §§ 8 to 10 of the Telemedia Act (TMG).
        </p>
        <h3 className="font-semibold mb-1">
          Participation in resolution procedure
        </h3>
        <p className="text-zinc-500 mb-6">
          I am neither obliged nor willing to participate in a dispute
          resolution procedure before a consumer arbitration board.
        </p>
      </div>
    </main>
  )
}
