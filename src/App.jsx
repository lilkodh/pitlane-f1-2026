import { createBrowserRouter, RouterProvider, Outlet } from "react-router"
import NavBar from "./components/nav-bar"
import Background8D from "./components/background-8d"
import HeroSection from "./components/hero-section"

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

// Home Route
const Home = () => {
  return (
    <div className="w-full">
      <HeroSection />
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
        element: <Home />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
