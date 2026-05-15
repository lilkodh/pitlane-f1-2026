import { NavLink } from 'react-router-dom';
import { Gauge, LayoutGrid, Home, Heart, History } from 'lucide-react';

const linkBase =
  'pit-nav-link relative inline-flex rounded-full px-4 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-200 ease-pit md:min-h-[44px] md:items-center';
const inactive = 'text-titanium/70 hover:text-f1red';
const active = 'text-f1red';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 px-4 pt-4 md:px-6">
      <nav
        className="liquid-glass-strong mx-auto flex h-14 max-w-pit items-center justify-between gap-3 rounded-full border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.03] px-2 py-1.5 pl-4 shadow-card-lift md:h-16 md:px-3 md:pl-6"
        aria-label="Main navigation"
      >
        <NavLink
          to="/"
          className="flex min-h-[44px] items-center gap-2 font-black tracking-tight text-titanium transition-transform duration-200 ease-pit hover:scale-[1.02]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-f1red/20 text-f1red shadow-glow-red/30">
            <Gauge className="h-4 w-4" aria-hidden />
          </span>
          <span className="hidden sm:inline">PITLANE</span>
        </NavLink>
        <div className="flex flex-wrap items-center justify-end gap-0.5 md:gap-1">
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
            <span className="hidden md:inline">Calendar</span>
          </NavLink>
          <NavLink
            to="/mongarage"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive} flex items-center gap-1.5`
            }
          >
            <Heart className="h-4 w-4 opacity-80" aria-hidden />
            <span className="hidden md:inline">My garage</span>
          </NavLink>
          <NavLink
            to="/masaison"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive} flex items-center gap-1.5`
            }
          >
            <History className="h-4 w-4 opacity-80" aria-hidden />
            <span className="hidden md:inline">My season</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
