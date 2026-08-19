import { useRef, useEffect, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { cameras } from '../data/cameras'

const MAP_STYLE = 'https://map.apace-ai.com/styles/basic-preview/style.json'
const DEFAULT_CENTER = [110.4167, -6.9667] // [lng, lat] — Semarang, Jawa Tengah
const DEFAULT_ZOOM = 12

function addCameraMarkers(map) {
  if (map.getSource('cameras')) return

  map.addSource('cameras', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: cameras.map((cam) => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: cam.coords },
        properties: {
          id: cam.id,
          location: cam.location,
          color: cam.color,
        },
      })),
    },
  })

  map.addLayer({
    id: 'cameras',
    type: 'circle',
    source: 'cameras',
    paint: {
      'circle-radius': 9,
      'circle-color': ['get', 'color'],
      'circle-stroke-color': '#ffffff',
      'circle-stroke-width': 2,
    },
  })
}

export default function MapArea() {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLE,
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      attributionControl: false,
      preserveDrawingBuffer: true,
    })

    mapRef.current = map

    map.on('load', () => {
      map.resize()
      setMapReady(true)
      addCameraMarkers(map)
    })

    const ro = new ResizeObserver(() => mapRef.current?.resize())
    ro.observe(mapContainerRef.current)

    return () => {
      ro.disconnect()
      map.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <section className="relative h-[30%] min-h-0 shrink-0 overflow-hidden border-b border-slate-300 bg-slate-800">
      <div ref={mapContainerRef} className="absolute inset-0" />
      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-lg bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-200 backdrop-blur">
            Loading map…
          </div>
        </div>
      )}
    </section>
  )
}
