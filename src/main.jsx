import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';

// Global Styles
import './index.css';

// Layout
import RootLayout from './layouts/root-layout.jsx';

// Pages
import HomePage from './pages/home-page.jsx';
import CalendarPage from './pages/calendar-page.jsx';
import RaceDetailPage from './pages/race-detail-page.jsx';
import MyGaragePage from './pages/my-garage-page.jsx';
import MySeasonPage from './pages/my-season-page.jsx';
import RaceGamePage from './pages/race-game-page.jsx';

// Register GSAP plugins ONCE here — never in components
gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);

// React Router v7 — always use 'react-router' (NOT react-router-dom)
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'calendar/:raceId', element: <RaceDetailPage /> },
      { path: 'mygarage', element: <MyGaragePage /> },
      { path: 'myseason', element: <MySeasonPage /> },
      { path: 'play', element: <RaceGamePage /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
