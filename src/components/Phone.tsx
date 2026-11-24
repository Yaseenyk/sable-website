import Image from "next/image";
import type { Shot } from "@/lib/shots";

/**
 * A real screen from the app inside a plain phone outline. The caption always says the entries are samples,
 * because the screens were captured with entries typed in for the purpose.
 */
export default function PhoneShot({ shot, priority = false, className = "max-w-[300px]" }: { shot: Shot; priority?: boolean; className?: string }) {
  return (
    <figure className={`mx-auto w-full ${className}`}>
      <div className="rounded-[2.2rem] border border-line bg-navy-sunken p-2.5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]">
        <Image
          src={shot.src}
          width={shot.width}
          height={shot.height}
          alt={shot.alt}
          priority={priority}
          sizes="300px"
          className="h-auto w-full rounded-[1.7rem] border border-line/60"
        />
      </div>
      <figcaption className="mt-3 text-center text-[13px] leading-snug text-ink-mute">
        {shot.caption}
        <span className="block font-mono text-[11.5px]">Real screen, sample entries</span>
      </figcaption>
    </figure>
  );
}
