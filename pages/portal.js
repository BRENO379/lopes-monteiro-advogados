import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

export default function Portal() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);
    const router = useRouter();

  async function handleLogin(e) {
        e.preventDefault();
        setErro('');
        setCarregando(true);
        try {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
                if (error) throw error;
                const role = data.user?.user_metadata?.role;
                if (role === 'admin') {
                          router.push('/admin');
                } else {
                          router.push('/cliente');
                }
        } catch (err) {
                setErro('E-mail ou senha invalidos. Verifique seus dados e tente novamente.');
        } finally {
                setCarregando(false);
        }
  }

  return (
        <>
          <Head>
            <title>Portal do Cliente - LGM Advogados</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
        <div className="min-h-screen bg-primary flex flex-col justify-center items-center px-4">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <h1 className="font-serif text-gold text-4xl font-bold">LGM</h1>
              <p className="text-gray-300 text-sm mt-1">Lopes e Monteiro Advogados</p>
    </div>
            <div className="bg-white rounded-xl shadow-2xl p-8">
                <h2 className="font-serif text-primary text-2xl font-bold mb-2 text-center">Portal do Cliente</h2>
                <p className="text-gray-500 text-sm text-center mb-6">Entre com suas credenciais de acesso</p>
  {erro && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded mb-4">
  {erro}
    </div>
               )}
              <form onSubmit={handleLogin} className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                      </div>
                <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                  <input
                    type="password"
                    required
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="Sua senha"
                  />
                      </div>
                <button
                  type="submit"
                  disabled={carregando}
                  className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-opacity-90 transition-opacity disabled:opacity-60 mt-2"
                >
                  {carregando ? 'Entrando...' : 'Entrar'}
</button>
  </form>
  </div>
          <p className="text-center text-gray-400 text-xs mt-6">
              <a href="/" className="hover:text-gold transition-colors">Voltar ao site institucional</a>
  </p>
  </div>
  </div>
  </>
  );
}
