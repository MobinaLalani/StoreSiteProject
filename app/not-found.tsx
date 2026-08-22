import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070B14] px-6 py-16 text-white">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[140px]" />

        <div className="absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[120px]" />

        <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #fff 1px, transparent 1px),
              linear-gradient(to bottom, #fff 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        {/* Badge */}
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
          </span>
          Page not found
        </div>

        {/* 404 */}
        <div className="relative">
          <h1 className="select-none bg-gradient-to-b from-white via-white/80 to-white/10 bg-clip-text text-[120px] font-black leading-none tracking-[-0.08em] text-transparent sm:text-[170px] md:text-[220px]">
            404
          </h1>

          <div className="absolute left-1/2 top-1/2 -z-10 h-32 w-64 -translate-x-1/2 -translate-y-1/2 bg-blue-500/20 blur-[80px]" />
        </div>

        {/* Content */}
        <div className="-mt-2 max-w-xl sm:-mt-5">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            به نظر میاد مسیر رو اشتباه اومدی
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/50 sm:text-base">
            صفحه‌ای که دنبالش هستی وجود نداره، حذف شده یا آدرسش تغییر کرده.
            می‌تونی به صفحه اصلی برگردی و دوباره مسیرت رو پیدا کنی.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex min-w-[180px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.12)]"
          >
           بازگشت به محصولات
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>

          <Link
            href="/"
            className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            مشاهده صفحات
          </Link>
        </div>

        {/* Error info */}
        <div className="mt-14 flex items-center gap-3 text-xs text-white/25">
          <span className="h-px w-8 bg-white/10" />
          ERROR_CODE: 404
          <span className="h-px w-8 bg-white/10" />
        </div>
      </div>

      {/* Decorative orbital */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.025]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />
    </main>
  );
}
