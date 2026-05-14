import { NavLink } from 'react-router-dom';
import { Gauge, LayoutGrid, Home, Heart, History } from 'lucide-react';

const linkBase =
  'rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-200';
const inactive = 'text-titanium/70 hover:text-f1red';
const active = 'text-f1red shadow-glow-red/40';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 px-4 pt-4 md:px-6">
      <nav
        className="liquid-glass-strong mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full px-2 py-2 pl-4 shadow-lg shadow-black/40 md:px-3 md:pl-6"
        aria-label="Navigation principale"
      >
        <NavLink
          to="/"
          className="flex items-center gap-2 font-black tracking-tight text-titanium"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-f1red/20 text-f1red">
            <Gauge className="h-4 w-4" aria-hidden />
          </span>
          <span className="hidden sm:inline">PITLANE</span>
        </NavLink>
        <div className="flex flex-wrap items-center justify-end gap-1 md:gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive} flex items-center gap-1.5`
            }
          >
            <Home className="h-4 w-4 opacity-80" aria-hidden />
            <span className="hidden md:inline">Paddock</span>
          </NavLink>
          <NavLink
            to="/calendrier"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive} flex items-center gap-1.5`
            }
          >
            <LayoutGrid className="h-4 w-4 opacity-80" aria-hidden />
            <span className="hidden md:inline">Calendrier</span>
          </NavLink>
          <NavLink
            to="/mongarage"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive} flex items-center gap-1.5`
            }
          >
            <Heart className="h-4 w-4 opacity-80" aria-hidden />
            <span className="hidden md:inline">Mon garage</span>
          </NavLink>
          <NavLink
            to="/masaison"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive} flex items-center gap-1.5`
            }
          >
            <History className="h-4 w-4 opacity-80" aria-hidden />
            <span className="hidden md:inline">Ma saison</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
