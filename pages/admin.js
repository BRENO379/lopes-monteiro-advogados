import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

export default function Admin() {
    const [user, setUser] = useState(null);
    const [clientes, setClientes] = useState([]);
    const [processos, setProcessos] = useState([]);
    const [abaAtiva, setAbaAtiva] = useState('clientes');
    const [carregando, setCarregando] = useState(true);
    const [msg, setMsg] = useState('');
    const router = useRouter();

  const [novoCliente, setNovoCliente] = useState({ email: '', nome: '', senha: '' });
    const [novoProcesso, setNovoProcesso] = useState({ cliente_id: '', numero: '', descricao: '', vara: '', tribunal: '', status: 'ativo' });
    const [novaMovimentacao, setNovaMovimentacao] = useState({ processo_id: '', tipo: '', descricao: '', data: '' });

  useEffect(() => {
        async function init() {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) { router.push('/portal'); return; }
                if (session.user.user_metadata?.role !== 'admin') { router.push('/cliente'); return; }
                setUser(session.user);
                await carregarDados();
                setCarregando(false);
        }
        init();
  }, []);

  async function carregarDados() {
        const { data: p } = await supabase.from('processos').select('*, clientes(nome, email)').order('criado_em', { ascending: false });
        setProcessos(p || []);
        const { data: c } = await supabase.from('clientes').select('*').order('nome');
        setClientes(c || []);
  }

  async function criarProcesso(e) {
        e.preventDefault();
        setMsg('');
        const { error } = await supabase.from('processos').insert([{ ...novoProcesso }]);
        if (error) { setMsg('Erro: ' + error.message); return; }
        setMsg('Processo criado com sucesso!');
        setNovoProcesso({ cliente_id: '', numero: '', descricao: '', vara: '', tribunal: '', status: 'ativo' });
        await carregarDados();
  }

  async function criarMovimentacao(e) {
        e.preventDefault();
        setMsg('');
        const { error } = await supabase.from('movimentacoes').insert([{ ...novaMovimentacao }]);
        if (error) { setMsg('Erro: ' + error.message); return; }
        setMsg('Movimentacao adicionada com sucesso!');
        setNovaMovimentacao({ processo_id: '', tipo: '', descricao: '', data: '' });
  }

  async function sair() {
        await supabase.auth.signOut();
        router.push('/portal');
  }

  if (carregando) return <div className="min-h-screen flex items-center justify-center"><p>Carregando...</p></div>;

  return (
        <>
          <Head><title>Painel Admin - LGM Advogados</title></Head>
          <div className="min-h-screen bg-gray-100">
            <header className="bg-primary text-white px-4 py-4 flex items-center justify-between">
              <div>
                <span className="font-serif text-gold text-xl font-bold">LGM</span>
              <span className="text-gray-300 text-sm ml-2">Painel Administrativo</span>
    </div>
            <button onClick={sair} className="text-sm text-gold border border-gold px-3 py-1 rounded hover:text-gold-light">Sair</button>
    </header>

        <div className="max-w-6xl mx-auto px-4 py-8">
  {msg && <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded">{msg}</div>}

          <div className="flex gap-2 mb-6 border-b border-gray-300">
  {['clientes', 'processos', 'movimentacao'].map(aba => (
                  <button key={aba} onClick={() => setAbaAtiva(aba)}
                className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${abaAtiva === aba ? 'border-gold text-primary' : 'border-transparent text-gray-500 hover:text-primary'}`}>
{aba === 'movimentacao' ? 'Add Movimentacao' : aba.charAt(0).toUpperCase() + aba.slice(1)}
</button>
            ))}
</div>

{abaAtiva === 'clientes' && (
              <div>
                <h2 className="font-serif text-primary text-xl font-bold mb-4">Clientes Cadastrados</h2>
               <p className="text-sm text-gray-500 mb-4">Para adicionar clientes, acesse o painel do Supabase em Authentication &gt; Users &gt; Add User e defina o metadado role como "cliente".</p>
               <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th className="text-left px-4 py-3">Nome</th>
                       <th className="text-left px-4 py-3">E-mail</th>
  </tr>
  </thead>
                   <tbody>
{clientes.length === 0 ? (
                        <tr><td colSpan={2} className="px-4 py-4 text-gray-400 text-center">Nenhum cliente na tabela clientes.</td></tr>
                      ) : clientes.map(c => (
                                              <tr key={c.id} className="border-t border-gray-100 hover:bg-gray-50">
                                                <td className="px-4 py-3">{c.nome}</td>
                                                               <td className="px-4 py-3 text-gray-500">{c.email}</td>
                        </tr>
                                                           ))}
</tbody>
  </table>
  </div>
  </div>
          )}

{abaAtiva === 'processos' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="font-serif text-primary text-xl font-bold mb-4">Novo Processo</h2>
                 <form onSubmit={criarProcesso} className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Cliente</label>
                     <select required value={novoProcesso.cliente_id} onChange={e => setNovoProcesso({...novoProcesso, cliente_id: e.target.value})}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                        <option value="">Selecione um cliente</option>
{clientes.map(c => <option key={c.id} value={c.id}>{c.nome} - {c.email}</option>)}
  </select>
  </div>
                  <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Numero do Processo</label>
                    <input required type="text" value={novoProcesso.numero} onChange={e => setNovoProcesso({...novoProcesso, numero: e.target.value})}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="0000000-00.0000.0.00.0000" />
  </div>
                  <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Descricao</label>
                    <textarea value={novoProcesso.descricao} onChange={e => setNovoProcesso({...novoProcesso, descricao: e.target.value})}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm" rows={3} />
  </div>
                  <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Vara</label>
                      <input type="text" value={novoProcesso.vara} onChange={e => setNovoProcesso({...novoProcesso, vara: e.target.value})}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
  </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Tribunal</label>
                      <input type="text" value={novoProcesso.tribunal} onChange={e => setNovoProcesso({...novoProcesso, tribunal: e.target.value})}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
  </div>
  </div>
                  <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                    <select value={novoProcesso.status} onChange={e => setNovoProcesso({...novoProcesso, status: e.target.value})}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                        <option value="ativo">Ativo</option>
                      <option value="suspenso">Suspenso</option>
                      <option value="encerrado">Encerrado</option>
  </select>
  </div>
                  <button type="submit" className="w-full btn-primary py-2 text-sm">Criar Processo</button>
  </form>
  </div>
              <div>
                  <h2 className="font-serif text-primary text-xl font-bold mb-4">Processos Cadastrados</h2>
                <div className="space-y-3">
{processos.length === 0 ? <p className="text-gray-400 text-sm">Nenhum processo.</p> : processos.map(p => (
                    <div key={p.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-primary text-sm">{p.numero}</p>
                          <p className="text-xs text-gray-500">{p.clientes?.nome} - {p.clientes?.email}</p>
  </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{p.status}</span>
  </div>
  </div>
                  ))}
                    </div>
                    </div>
                    </div>
          )}

{abaAtiva === 'movimentacao' && (
              <div className="max-w-lg">
                <h2 className="font-serif text-primary text-xl font-bold mb-4">Adicionar Movimentacao</h2>
               <form onSubmit={criarMovimentacao} className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Processo</label>
                   <select required value={novaMovimentacao.processo_id} onChange={e => setNovaMovimentacao({...novaMovimentacao, processo_id: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                      <option value="">Selecione um processo</option>
{processos.map(p => <option key={p.id} value={p.id}>{p.numero} - {p.clientes?.nome}</option>)}
  </select>
  </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Tipo</label>
                  <input required type="text" value={novaMovimentacao.tipo} onChange={e => setNovaMovimentacao({...novaMovimentacao, tipo: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="Ex: Audiencia, Peticao, Sentenca" />
  </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Descricao</label>
                  <textarea required value={novaMovimentacao.descricao} onChange={e => setNovaMovimentacao({...novaMovimentacao, descricao: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm" rows={3} />
  </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Data</label>
                  <input required type="date" value={novaMovimentacao.data} onChange={e => setNovaMovimentacao({...novaMovimentacao, data: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
  </div>
                <button type="submit" className="w-full btn-primary py-2 text-sm">Adicionar Movimentacao</button>
  </form>
  </div>
          )}
</div>
            </div>
            </>
  );
}
