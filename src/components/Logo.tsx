/** The Sable mark, the same drawing as the app icon: cyan-to-indigo tile, white broken ring and a dot in the gap. */
export function LogoMark({ size = 32, id = "sable-mark" }: { size?: number; id?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="24" fill={`url(#${id})`} />
      <path d="M44.83 69.32 A20 20 0 1 1 66.77 60.89" stroke="#F8FAFC" strokeWidth="8" strokeLinecap="round" fill="none" />
      <circle cx="57.16" cy="68.67" r="6" fill="#F8FAFC" />
    </svg>
  );
}

export default function Logo({ id }: { id?: string }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={30} id={id} />
      <span className="text-[19px] font-semibold tracking-tight text-ink">Sable</span>
    </span>
  );
}
