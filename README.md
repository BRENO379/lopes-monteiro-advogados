# LGM - Lopes e Monteiro Sociedade de Advogados

Site institucional com portal do cliente e painel administrativo.

**Stack:** Next.js + Tailwind CSS + Supabase

## Instalacao Rapida

### 1. Clone o repositorio
```bash
git clone https://github.com/BRENO379/lopes-monteiro-advogados.git
cd lopes-monteiro-advogados
npm install
```

### 2. Configure o Supabase
1. Crie conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Va em **SQL Editor** e execute o conteudo do arquivo `supabase/schema.sql`
4. Va em **Settings > API** e copie a URL e a chave anon
5. Crie o arquivo `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
```

### 3. Crie o usuario admin
No Supabase, va em **Authentication > Users > Add User**:
- Email: admin@lopesemonteiro.adv.br
- Senha: (escolha uma senha segura)
- User Metadata: `{"role": "admin"}`

### 4. Rode o projeto
```bash
npm run dev
```
Acesse: http://localhost:3000

### 5. Deploy na Vercel
1. Va em [vercel.com](https://vercel.com) e conecte seu GitHub
2. Importe o repositorio
3. Adicione as variaveis de ambiente (NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY)
4. Clique em Deploy

## Estrutura do Projeto
```
/ (raiz)
  package.json          - Dependencias
  next.config.js        - Config Next.js
  tailwind.config.js    - Cores e fontes
  postcss.config.js     - Config CSS
  .env.local.example    - Modelo de variaveis
  lib/supabase.js       - Conexao Supabase
  styles/globals.css    - Estilos globais
  pages/_app.js         - Componente raiz
  pages/index.js        - Pagina inicial (institucional)
  pages/portal.js       - Login do cliente
  pages/cliente.js      - Area do cliente
  pages/admin.js        - Painel administrativo
  components/Header.js  - Cabecalho
  components/Footer.js  - Rodape
  supabase/schema.sql   - Banco de dados
```

## Funcionalidades
- Site institucional (Home, Sobre, Areas de Atuacao, Contato)
- Portal do cliente com login
- Area do cliente (processos, movimentacoes, documentos)
- Painel admin visual (criar clientes, processos, movimentacoes, upload docs)
- Endereco: Rua Alberto Cintra 161, Sala 1002, Uniao - BH/MG - CEP 31.160-370
