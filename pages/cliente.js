import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

export default function Cliente() {
  const [user, setUser] = useState(null);
  const [processos, setProcessos] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState('processos');
  const [carregando, setCarregando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push('/portal'); return; }
      const u = session.user;
      if (u.user_metadata?.role === 'admin') { router.push('/admin'); return; }
      setUser(u);
      await carregarDados(u.id);
      setCarregando(false);
    }
    init();
  }, []);

  async function carregarDados(clienteId) {
    const { data: p } = await supabase.from('processos').select('*').eq('cliente_id', clienteId).order('criado_em', { ascending: false });
    setProcessos(p || []);
    if (p && p.length > 0) {
      const ids = p.map(x => x.id);
      const { data: m } = await supabase.from('movimentacoes').select('*').in('processo_id', ids).order('data', { ascending: false });
      setMovimentacoes(m || []);
      const { data: d } = await supabase.from('documentos').select('*').in('processo_id', ids).order('criado_em', { ascending: false });
      setDocumentos(d || []);
    }
  }

  async function sair() {
    await supabase.auth.signOut();
    router.push('/portal');
  }

  if (carregando) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500">Carregando...</p></div>;

  return (
    <>
      <Head><title>Area do Cliente - LGM Advogados</title></Head>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-primary text-white px-4 py-4 flex items-center justify-between">
          <div>
            <span className="font-serif text-gold text-xl font-bold">LGM</span>
            <span className="text-gray-300 text-sm ml-2">Area do Cliente</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-300 text-sm hidden sm:block">{user?.email}</span>
            <button onClick={sair} className="text-sm text-gold hover:text-gold-light border border-gold px-3 py-1 rounded">Sair</button>
          </div>
        </header>
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="font-serif text-primary text-2xl font-bold mb-6">Bem-vindo ao seu painel</h1>
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            {['processos', 'movimentacoes', 'documentos'].map(aba => (
              <button key={aba} onClick={() => setAbaAtiva(aba)}
                className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${abaAtiva === aba ? 'border-gold text-primary' : 'border-transparent text-gray-500 hover:text-primary'}`}>
                {aba === 'movimentacoes' ? 'Movimentacoes' : aba.charAt(0).toUpperCase() + aba.slice(1)}
              </button>
            ))}
          </div>
          {abaAtiva === 'processos' && (
            <div className="space-y-4">
              {processos.length === 0 ? <p className="text-gray-500 text-sm">Nenhum processo encontrado.</p> : processos.map(p => (
                <div key={p.id} className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-primary">{p.numero}</h3>
                      <p className="text-sm text-gray-600 mt-1">{p.descricao}</p>
                      <p className="text-xs text-gray-400 mt-2">Vara: {p.vara} | Tribunal: {p.tribunal}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${p.status === 'ativo' ? 'bg-green-100 text-green-700' : p.status === 'encerrado' ? 'bg-gray-100 text-gray-600' : 'bg-yellow-100 text-yellow-700'}`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {abaAtiva === 'movimentacoes' && (
            <div className="space-y-3">
              {movimentacoes.length === 0 ? <p className="text-gray-500 text-sm">Nenhuma movimentacao encontrada.</p> : movimentacoes.map(m => (
                <div key={m.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">{new Date(m.data).toLocaleDateString('pt-BR')}</span>
                    <span className="text-xs text-gold font-medium">{m.tipo}</span>
                  </div>
                  <p className="text-sm text-gray-700">{m.descricao}</p>
                </div>
              ))}
            </div>
          )}
          {abaAtiva === 'documentos' && (
            <div className="space-y-3">
              {documentos.length === 0 ? <p className="text-gray-500 text-sm">Nenhum documento encontrado.</p> : documentos.map(d => (
                <div key={d.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-primary">{d.nome}</p>
                    <p className="text-xs text-gray-400">{new Date(d.criado_em).toLocaleDateString('pt-BR')}</p>
                  </div>
                  {d.url && (
                    <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-gold text-sm hover:text-gold-light font-medium">Baixar</a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
