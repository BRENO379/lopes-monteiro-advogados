-- LGM - Lopes e Monteiro Advogados
-- Execute este script no SQL Editor do Supabase

-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    telefone TEXT,
    criado_em TIMESTAMPTZ DEFAULT NOW()
  );

-- Tabela de Processos
CREATE TABLE IF NOT EXISTS processos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
    numero TEXT NOT NULL,
    descricao TEXT,
    vara TEXT,
    tribunal TEXT,
    status TEXT DEFAULT 'ativo' CHECK (status IN ('ativo', 'suspenso', 'encerrado')),
    criado_em TIMESTAMPTZ DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ DEFAULT NOW()
  );

-- Tabela de Movimentacoes
CREATE TABLE IF NOT EXISTS movimentacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    processo_id UUID REFERENCES processos(id) ON DELETE CASCADE,
    tipo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    data DATE NOT NULL,
    criado_em TIMESTAMPTZ DEFAULT NOW()
  );

-- Tabela de Documentos
CREATE TABLE IF NOT EXISTS documentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    processo_id UUID REFERENCES processos(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    url TEXT,
    criado_em TIMESTAMPTZ DEFAULT NOW()
  );

-- Row Level Security
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE processos ENABLE ROW LEVEL SECURITY;
ALTER TABLE movimentacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos ENABLE ROW LEVEL SECURITY;

-- Admin acessa tudo
CREATE POLICY "Admin clientes" ON clientes FOR ALL
  USING ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin') WITH CHECK (true);

CREATE POLICY "Admin processos" ON processos FOR ALL
  USING ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin') WITH CHECK (true);

CREATE POLICY "Admin movimentacoes" ON movimentacoes FOR ALL
  USING ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin') WITH CHECK (true);

CREATE POLICY "Admin documentos" ON documentos FOR ALL
  USING ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin') WITH CHECK (true);

-- Cliente ve seus dados
CREATE POLICY "Cliente ve processos" ON processos FOR SELECT
  USING (cliente_id IN (SELECT id FROM clientes WHERE user_id = auth.uid()));

CREATE POLICY "Cliente ve movimentacoes" ON movimentacoes FOR SELECT
  USING (processo_id IN (
      SELECT p.id FROM processos p JOIN clientes c ON c.id = p.cliente_id WHERE c.user_id = auth.uid()
    ));

CREATE POLICY "Cliente ve documentos" ON documentos FOR SELECT
  USING (processo_id IN (
      SELECT p.id FROM processos p JOIN clientes c ON c.id = p.cliente_id WHERE c.user_id = auth.uid()
    ));

-- Trigger para atualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.atualizado_em = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_processos_ts
  BEFORE UPDATE ON processos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
