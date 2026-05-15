import { Outlet } from 'react-router';
import Navbar from '../components/navbar.jsx';
import Footer from '../components/footer.jsx';

// ============================================================
// RootLayout — wraps all pages with Navbar + Footer
// Outlet renders the active child route
// ============================================================

export default function RootLayout() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#050505',
        position: 'relative',
      }}
      className="noise-overlay"
    >
      <Navbar />
      <main style={{ minHeight: '100vh' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
