import { useRef, useState } from 'react'
import { cameras } from '../data/cameras'

const vehicleClasses = [
  { label: 'Mobil', color: '#3b82f6' },
  { label: 'Motor', color: '#22c55e' },
  { label: 'Truk', color: '#f59e0b' },
  { label: 'Bus', color: '#8b5cf6' },
]

const baseCounts = [120, 340, 44, 12]

function DataPanels({ counts, total, top }) {
  const [tab, setTab] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const gesture = useRef({ x: 0, y: 0, axis: null })

  const onPointerDown = (e) => {
    gesture.current = { x: e.clientX, y: e.clientY, axis: null }
    setDragging(true)
    setDragX(0)
  }

  const onPointerMove = (e) => {
    if (!dragging) return
    const dx = e.clientX - gesture.current.x
    const dy = e.clientY - gesture.current.y

    if (gesture.current.axis === null) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
      gesture.current.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
    }

    if (gesture.current.axis === 'x') setDragX(dx)
  }

  const onPointerEnd = () => {
    if (gesture.current.axis === 'x') {
      const threshold = 48
      if (dragX < -threshold && tab < 1) setTab(tab + 1)
      else if (dragX > threshold && tab > 0) setTab(tab - 1)
    }
    setDragging(false)
    setDragX(0)
    gesture.current.axis = null
  }

  const isX = dragging && gesture.current.axis === 'x'
  const translateX = isX
    ? `calc(${-tab * 100}% + ${dragX}px)`
    : `${-tab * 100}%`

  return (
    <div className="flex min-h-0 flex-1 flex-col py-3">
      <div className="mb-2 flex shrink-0 items-center justify-center gap-1.5">
        <span
          className={`h-1.5 rounded-full transition-all duration-200 ${
            tab === 0 ? 'w-5 bg-slate-800' : 'w-1.5 bg-slate-300'
          }`}
        />
        <span
          className={`h-1.5 rounded-full transition-all duration-200 ${
            tab === 1 ? 'w-5 bg-slate-800' : 'w-1.5 bg-slate-300'
          }`}
        />
      </div>

      <div
        className="min-h-0 flex-1 touch-pan-y select-none overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        <div
          className={`flex h-full w-full ${
            isX ? '' : 'transition-transform duration-300 ease-out'
          }`}
          style={{ transform: `translateX(${translateX})` }}
        >
          {/* Panel 1 — counting */}
          <div className="h-full w-full shrink-0 snap-center rounded-xl border border-slate-200 bg-white p-2">
            <div className="flex h-full flex-col gap-3 overflow-hidden">
              <h3 className="text-sm font-semibold text-slate-700">
                Volume Kendaraan (kend./5 menit)
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {counts.map((c) => (
                  <div
                    key={c.label}
                    className="rounded-xl border border-slate-200 bg-white p-3"
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: c.color }}
                      />
                      <span className="text-xs font-medium text-slate-500">
                        {c.label}
                      </span>
                    </div>
                    <p className="mt-1 text-2xl font-bold tabular-nums text-slate-800">
                      {c.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Panel 2 — analysis */}
          <div className="h-full w-full shrink-0 snap-center">
            <div className="flex h-full flex-col gap-3 overflow-hidden">
              <h3 className="text-sm font-semibold text-slate-700">Analisis</h3>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs leading-relaxed text-slate-500">
                  Total kendaraan terdeteksi <strong>{total}</strong>. Kelas
                  dominan <strong>{top.label}</strong> (
                  {Math.round((top.value / total) * 100)}%). Arus lalu lintas
                  terpantau ramai lancar.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <h4 className="text-xs font-semibold text-slate-700">
                  Komposisi Kendaraan
                </h4>
                <div className="mt-3 space-y-2.5">
                  {counts.map((c) => {
                    const pct = Math.round((c.value / total) * 100)
                    return (
                      <div key={c.label}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1.5 text-slate-600">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: c.color }}
                            />
                            {c.label}
                          </span>
                          <span className="tabular-nums text-slate-500">
                            {pct}%
                          </span>
                        </div>
                        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${pct}%`, backgroundColor: c.color }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CameraArea() {
  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between px-4 py-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          CCTV Ruas 24090
        </h2>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </span>
      </div>

      {/* Whole card swipes together: video (40%) + data (60%) */}
      <div className="flex-1 snap-y snap-mandatory overflow-y-auto overscroll-contain">
        {cameras.map((cam, i) => {
          const counts = vehicleClasses.map((c, j) => ({
            ...c,
            value: baseCounts[j] + (i + 1) * 13,
          }))
          const total = counts.reduce((sum, c) => sum + c.value, 0)
          const top = counts.reduce((a, b) => (a.value > b.value ? a : b))

          return (
            <div
              key={cam.id}
              className="flex h-full snap-center flex-col px-4 pb-4"
            >
              {/* Video — 40% of the card */}
              <div className="relative h-[40%] shrink-0 overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
                {cam.streamUrl ? (
                  <iframe
                    src={`${cam.streamUrl}?autoplay=1&mute=1&playsinline=1`}
                    title={cam.id}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                    <svg
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </div>
                )}
                <span className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">
                  {cam.id}
                </span>
              </div>

              {/* Counting + analysis — swipe left/right */}
              <DataPanels counts={counts} total={total} top={top} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
