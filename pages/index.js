import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

const areas = [
  { titulo: 'Direito Civil', descricao: 'Contratos, responsabilidade civil, direito de familia e sucessoes.' },
  { titulo: 'Direito Empresarial', descricao: 'Constituicao de empresas, contratos comerciais e recuperacao judicial.' },
  { titulo: 'Direito Trabalhista', descricao: 'Defesa de empregados e empregadores, reclamatorias e acordos.' },
  { titulo: 'Direito Previdenciario', descricao: 'Aposentadorias, pensoes e beneficios junto ao INSS.' },
  { titulo: 'Direito Imobiliario', descricao: 'Compra, venda, locacao, usucapiao e regularizacao de imoveis.' },
  { titulo: 'Direito do Consumidor', descricao: 'Defesa dos direitos do consumidor e acoes de indenizacao.' },
  ];

export default function Home() {
    return (
          <>
            <Head>
              <title>LGM - Lopes e Monteiro Advogados</title>
          <meta name="description" content="Escritorio de advocacia em Belo Horizonte. Atendimento personalizado com excelencia juridica." />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
        <Header />
            <main>
              <section className="bg-primary text-white py-24 px-4">
                <div className="max-w-4xl mx-auto text-center">
                  <p className="text-gold text-sm uppercase tracking-widest mb-4 font-medium">Escritorio de Advocacia</p>
              <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    Lopes e Monteiro<br />
                    <span className="text-gold">Sociedade de Advogados</span>
      </h1>
              <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                    Solucoes juridicas personalizadas com seriedade, etica e comprometimento com os seus direitos.
      </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#contato" className="btn-primary text-center">Entre em Contato</a>
                <a href="#areas" className="btn-outline text-center">Areas de Atuacao</a>
      </div>
      </div>
      </section>
          <section id="sobre" className="py-20 px-4 bg-white">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <p className="text-gold text-sm uppercase tracking-wider font-medium mb-2">Quem Somos</p>
                <h2 className="section-title">Sobre o Escritorio</h2>
                <div className="gold-divider"></div>
                <p className="text-gray-600 leading-relaxed mb-4">
                      O escritorio LGM - Lopes e Monteiro Sociedade de Advogados atua com foco na excelencia juridica e no atendimento humanizado. Com equipe qualificada, oferecemos consultoria e representacao em diversas areas do direito.
      </p>
                    <p className="text-gray-600 leading-relaxed">
                      Localizado em Belo Horizonte, Minas Gerais, nosso escritorio preza pela transparencia, etica e comprometimento com os resultados de cada cliente.
      </p>
      </div>
              <div className="bg-gray-50 rounded-lg p-8 border-l-4 border-gold">
                    <h3 className="font-serif text-primary text-xl font-bold mb-4">Nossos Valores</h3>
                <ul className="space-y-3 text-gray-600 text-sm">
                      <li className="flex items-start gap-3"><span className="text-gold font-bold">+</span> Etica e transparencia em todas as relacoes</li>
                      <li className="flex items-start gap-3"><span className="text-gold font-bold">+</span> Comprometimento com os resultados do cliente</li>
                      <li className="flex items-start gap-3"><span className="text-gold font-bold">+</span> Atendimento personalizado e humanizado</li>
                      <li className="flex items-start gap-3"><span className="text-gold font-bold">+</span> Excelencia tecnica e atualizacao constante</li>
                      <li className="flex items-start gap-3"><span className="text-gold font-bold">+</span> Sigilo e confidencialidade absolutos</li>
      </ul>
      </div>
      </div>
      </section>
          <section id="areas" className="py-20 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-12">
                    <p className="text-gold text-sm uppercase tracking-wider font-medium mb-2">Especialidades</p>
                <h2 className="section-title">Areas de Atuacao</h2>
                <div className="gold-divider mx-auto"></div>
      </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {areas.map((area, i) => (
                      <div key={i} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border-t-4 border-gold">
                        <h3 className="font-serif text-primary text-lg font-bold mb-3">{area.titulo}</h3>
                                 <p className="text-gray-600 text-sm leading-relaxed">{area.descricao}</p>
      </div>
                             ))}
</div>
  </div>
  </section>
        <section id="contato" className="py-20 px-4 bg-primary text-white">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-gold text-sm uppercase tracking-wider font-medium mb-2">Fale Conosco</p>
            <h2 className="font-serif text-3xl font-bold mb-4 text-white">Entre em Contato</h2>
            <div className="gold-divider mx-auto"></div>
            <p className="text-gray-300 mb-10">Agende uma consulta e converse com nossos advogados.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="bg-white bg-opacity-10 rounded-lg p-6">
                  <h4 className="text-gold font-semibold mb-2">Endereco</h4>
                <p className="text-gray-300">Rua Alberto Cintra, 161</p>
                <p className="text-gray-300">Sala 1002 - Uniao</p>
                <p className="text-gray-300">BH / MG - CEP 31.160-370</p>
  </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                  <h4 className="text-gold font-semibold mb-2">Horario</h4>
                <p className="text-gray-300">Segunda a Sexta</p>
                <p className="text-gray-300">08h00 as 18h00</p>
  </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                  <h4 className="text-gold font-semibold mb-2">Portal do Cliente</h4>
                <p className="text-gray-300 mb-3">Acompanhe seus processos online.</p>
                <a href="/portal" className="btn-primary text-xs py-2 px-4 inline-block">Acessar Portal</a>
  </div>
  </div>
  </div>
  </section>
  </main>
      <Footer />
  </>
  );
}
