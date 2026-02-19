import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

  return (
        <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="font-serif text-gold text-xl font-bold leading-tight">LGM</span>
              <span className="text-xs text-gray-300 leading-tight">Lopes & Monteiro Advogados</span>
    </div>
    </Link>

        <nav className="hidden md:flex items-center gap-8">
              <Link href="/#sobre" className="text-gray-200 hover:text-gold transition-colors text-sm font-medium">Sobre</Link>
            <Link href="/#areas" className="text-gray-200 hover:text-gold transition-colors text-sm font-medium">Areas de Atuacao</Link>
            <Link href="/#contato" className="text-gray-200 hover:text-gold transition-colors text-sm font-medium">Contato</Link>
            <Link href="/portal" className="btn-primary text-sm py-2 px-5">Portal do Cliente</Link>
    </nav>

          <button
              className="md:hidden text-gold"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
                           ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
              </svg>
              </button>
              </div>

  {menuOpen && (
            <div className="md:hidden bg-primary border-t border-gray-700 px-4 py-4 flex flex-col gap-4">
              <Link href="/#sobre" onClick={() => setMenuOpen(false)} className="text-gray-200 hover:text-gold text-sm">Sobre</Link>
            <Link href="/#areas" onClick={() => setMenuOpen(false)} className="text-gray-200 hover:text-gold text-sm">Areas de Atuacao</Link>
          <Link href="/#contato" onClick={() => setMenuOpen(false)} className="text-gray-200 hover:text-gold text-sm">Contato</Link>
          <Link href="/portal" onClick={() => setMenuOpen(false)} className="btn-primary text-sm text-center py-2">Portal do Cliente</Link>
  </div>
        )}
  </header>
  );
}
