import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/layout/root-layout.jsx';
import HomePage from './pages/home-page.jsx';
import CalendarPage from './pages/calendar-page.jsx';
import RaceDetailPage from './pages/race-detail-page.jsx';
import GaragePage from './pages/garage-page.jsx';
import SeasonPage from './pages/season-page.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'calendrier', element: <CalendarPage /> },
      { path: 'calendrier/:raceId', element: <RaceDetailPage /> },
      { path: 'mongarage', element: <GaragePage /> },
      { path: 'masaison', element: <SeasonPage /> },
    ],
  },
]);
