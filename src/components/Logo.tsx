interface LogoProps {
  className?: string;
}

export function LogoMark({ className = 'h-11 w-11' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="45" fill="none" stroke="#F09819" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="39" fill="none" stroke="#E63E1E" strokeWidth="4.5" />
      <text
        x="50"
        y="57"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="27"
        fill="#E63E1E"
      >
        TIC
      </text>
      <path
        d="M 30 68 Q 50 78 70 68"
        fill="none"
        stroke="#F09819"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="28" cy="66" r="1.8" fill="#F09819" />
      <circle cx="72" cy="66" r="1.8" fill="#F09819" />
    </svg>
  );
}

export function Wordmark({ tight = false }: { tight?: boolean }) {
  return (
    <div className="flex flex-col leading-none">
      <span
        className={`font-display font-extrabold tracking-tight text-ink-900 ${tight ? 'text-sm' : 'text-lg'}`}
      >
        THE INDIAN <span className="text-brand-600">COMPUTERS</span>
      </span>
      {!tight && (
        <span className="mt-1 flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.2em] text-gold-500">
          <span className="h-px w-3 bg-gold-400" />
          SINCE 2007
        </span>
      )}
    </div>
  );
}

export default function Logo({ tight = false }: { tight?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark className={tight ? 'h-9 w-9' : 'h-11 w-11'} />
      <Wordmark tight={tight} />
    </div>
  );
}
