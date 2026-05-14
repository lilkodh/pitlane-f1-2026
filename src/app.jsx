/**
 * PITLANE — App Root & React Router v7 Configuration
 * ====================================================
 * Defines the full route tree and wraps every page
 * in the shared RootLayout (Background8D + NavBar).
 *
 * ROUTER RULE: Always import from "react-router", never "react-router-dom"
 */

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router'
import { F1Provider } from './context/f1-context'
import NavBar        from './components/nav-bar'
import Background8D  from './components/background-8d'
import HomePage      from './pages/home-page'
import CalendarPage  from './pages/calendar-page'
import RaceDetailPage from './pages/race-detail-page'
import GaragePage    from './pages/garage-page'
import SeasonPage    from './pages/season-page'

/* ── Root Layout: shared chrome wrapping every route ──────── */
const RootLayout = () => (
  <F1Provider>
    <div className="relative min-h-screen text-white bg-[#050505]">
      {/* Layer 1 — WebGL particle background */}
      <Background8D />

      {/* All page content sits above the background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  </F1Provider>
)

/* ── Route tree ───────────────────────────────────────────── */
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,                element: <HomePage />      },
      { path: 'calendar',           element: <CalendarPage />  },
      { path: 'calendar/:raceId',   element: <RaceDetailPage />},
      { path: 'mygarage',           element: <GaragePage />    },
      { path: 'myseason',           element: <SeasonPage />    },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
