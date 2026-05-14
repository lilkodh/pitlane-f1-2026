/**
 * PITLANE — Navigation Header
 * =============================
 * Design System 1.0
 */

import { Link, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function NavBar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { path: '/', label: 'Paddock' },
    { path: '/calendar', label: 'Calendar' },
    { path: '/mygarage', label: 'My Garage' },
    { path: '/myseason', label: 'My Season' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[64px] md:h-[64px] h-[56px] flex items-center bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-[24px] font-bold font-hero tracking-tighter text-[var(--text-primary)]">
          PITLANE<span className="text-[var(--color-racing-red)]">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-[24px]">
          {links.map(link => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative text-[16px] font-normal font-body transition-colors hover:text-[var(--color-electric-blue)]"
                style={{ color: isActive ? 'var(--text-primary)' : 'var(--color-track-gray)' }}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-[var(--color-racing-red)]" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-[var(--text-primary)]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-[56px] left-0 right-0 bg-[var(--bg-primary)] border-b border-[var(--border-color)] flex flex-col p-4 md:hidden">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="py-3 text-[16px] font-body text-[var(--text-primary)] border-b border-[var(--border-color)] last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
