import { createBrowserRouter, RouterProvider, Outlet } from "react-router"
import NavBar from "./components/nav-bar"
import Background8D from "./components/background-8d"
import HomePage from "./pages/home-page"
import CalendarPage from "./pages/calendar-page"
import RaceDetailPage from "./pages/race-detail-page"
import GaragePage from "./pages/garage-page"
import SeasonPage from "./pages/season-page"

// Layout wrapping the 8D Background and the Nav
const RootLayout = () => {
  return (
    <div className="relative min-h-screen text-white bg-[#050505]">
      <Background8D />
      <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "calendar/:raceId",
        element: <RaceDetailPage />,
      },
      {
        path: "mygarage",
        element: <GaragePage />,
      },
      {
        path: "myseason",
        element: <SeasonPage />,
      }
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
