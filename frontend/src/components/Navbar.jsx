import { useState } from 'react'

const menuItems = [
  { label: 'Dashboard' },
  { label: 'Cameras' },
  { label: 'Map' },
  { label: 'Analysis' },
  { label: 'Settings' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="relative z-20 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm">
        <img
          src="/logo_bbpjn_jaya.png"
          alt="JAYA"
          className="h-10 w-auto object-contain"
        />

        <h1 className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-slate-800">
          CCTV AI
        </h1>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 active:bg-slate-200"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
            />
          </svg>
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-4">
            <img
              src="/logo_bbpjn_jaya.png"
              alt="JAYA"
              className="h-10 w-auto object-contain"
            />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 active:bg-slate-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="px-8 pt-10">
            <h2 className="text-2xl font-extrabold uppercase leading-tight tracking-wide text-slate-900">
              LALU LINTAS OTOMATIS TERKLASIFIKASI
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Berbasis Artificial Intelligence
            </p>
          </div>

          <nav className="flex flex-1 flex-col justify-center px-8">
            {menuItems.map((item, i) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 border-b border-slate-100 py-5 text-left transition hover:pl-2"
              >
                <span className="text-sm font-semibold text-slate-400">
                  0{i + 1}
                </span>
                <span className="text-3xl font-bold text-slate-800">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
