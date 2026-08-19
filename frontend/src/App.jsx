import Navbar from './components/Navbar'
import MapArea from './components/MapArea'
import CameraArea from './components/CameraArea'

export default function App() {
  return (
    <div className="flex h-dvh flex-col bg-slate-100 text-slate-900">
      <Navbar />
      <div className="flex min-h-0 flex-1 flex-col">
        <MapArea />
        <CameraArea />
      </div>
    </div>
  )
}
