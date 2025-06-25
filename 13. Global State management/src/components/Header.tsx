import { Link } from '@tanstack/react-router'
import { useZustandStore } from '@/store/zustandStore'
import { useStore } from '@tanstack/react-store'
import { counterStore } from '@/store/tanstackStore'

export default function Header() {
  const count = useZustandStore((state) => state.count)
  const tanstackCount = useStore(counterStore)

  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/">Local State</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/zustand-counter">Zustand Store count: {count} </Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/tanstack-counter">TanstackStore: {tanstackCount}</Link>
        </div>
      </nav>
    </header>
  )
}
