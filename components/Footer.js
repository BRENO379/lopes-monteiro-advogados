import Link from 'next/link';

export default function Footer() {
    return (
          <footer className="bg-primary text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <h3 className="font-serif text-gold text-2xl font-bold mb-2">LGM</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Lopes e Monteiro Sociedade de Advogados.
                  Comprometidos com a excelencia juridica e o atendimento personalizado.
                </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navegacao</h4>
          <ul className="space-y-2 text-sm">
                  <li><Link href="/#sobre" className="hover:text-gold transition-colors">Sobre o Escritorio</Link></li>
            <li><Link href="/#areas" className="hover:text-gold transition-colors">Areas de Atuacao</Link></li>
            <li><Link href="/#contato" className="hover:text-gold transition-colors">Contato</Link></li>
                  <li><Link href="/portal" className="hover:text-gold transition-colors">Portal do Cliente</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Endereco</h4>
                <address className="not-italic text-sm space-y-1 text-gray-400">
                  <p>Rua Alberto Cintra, 161</p>
                  <p>Sala 1002 - Uniao</p>
                  <p>Belo Horizonte / MG</p>
                  <p>CEP: 31.160-370</p>
                </address>
              </div>
            </div>
            <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-500">
              <p>2024 LGM - Lopes e Monteiro Sociedade de Advogados. Todos os direitos reservados.</p>
            </div>
          </footer>
        );
}
