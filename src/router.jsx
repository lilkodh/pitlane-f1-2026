import { createBrowserRouter } from 'react-router'

/**
 * Application router — pages will be added here in subsequent steps.
 * Using `react-router` (v7) directly, NOT `react-router-dom`.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <div style={{ color: '#f5f5f5', padding: '2rem', fontFamily: 'system-ui' }}>Pitlane — scaffold ready 🏁</div>,
  },
])
