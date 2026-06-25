import Image from "next/image";
import Link from "next/link";

export default function LinkedInProfileCard() {
  const linkedInUrl = "https://www.linkedin.com/in/rajpoot-developer";

  return (
    <aside className="rounded-2xl border border-phosphor/20 bg-black/70 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-electric/30 bg-gradient-to-br from-electric/20 to-phosphor/20">
            <Image
              src="/avatars/afaq-profile.svg"
              alt="Portrait illustration of Afaq Ahmad"
              width={56}
              height={56}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-electric/80">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
                <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.38a1.56 1.56 0 0 1 0 3.12ZM5.5 9.74h2.88V18H5.5V9.74Zm4.77 0h2.76v1.13h.04c.38-.72 1.32-1.48 2.72-1.48 2.91 0 3.45 1.91 3.45 4.4V18H16.8v-7.51c0-1.79-.03-4.09-2.49-4.09-2.49 0-2.87 1.94-2.87 3.95V18H10.27V9.74Z" />
              </svg>
              <span>LinkedIn</span>
            </div>
            <h3 className="font-display text-lg font-semibold text-white">Afaq Ahmad</h3>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-phosphor/70">
              Full Stack Developer
            </p>
          </div>
        </div>

        <Link
          href={linkedInUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Visit Afaq Ahmad's LinkedIn profile"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-electric/40 bg-electric/10 px-4 py-2 text-sm font-semibold text-electric transition-all duration-200 hover:-translate-y-0.5 hover:bg-electric/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
        >
          <span>View LinkedIn Profile</span>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <path d="M10 7h7v7" />
          </svg>
        </Link>
      </div>
    </aside>
  );
}
