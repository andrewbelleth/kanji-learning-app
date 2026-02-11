# KanGo - Requisitos do Projeto

## Visao Geral

KanGo e uma plataforma de aprendizado de kanji japoneses, inspirada no WaniKani, com interface em portugues.
O sistema utiliza repeticao espacada (SRS) para ensinar radicais, kanji e vocabulario de forma progressiva,
organizada em 60 niveis agrupados em 6 faixas tematicas.

---

## 1. Arquitetura e Stack Tecnico

| Camada           | Tecnologia                       | Status MVP      |
| ---------------- | -------------------------------- | --------------- |
| Framework        | Next.js 16 (App Router)         | Implementado    |
| UI               | Tailwind CSS + shadcn/ui        | Implementado    |
| Banco de Dados   | Supabase (PostgreSQL)           | Pendente        |
| Autenticacao     | Supabase Auth                   | Placeholder     |
| Algoritmo SRS    | FSRS                            | Pendente        |
| Idioma da UI     | Portugues (pt-BR)               | Implementado    |

---

## 2. Sistema de Niveis e Faixas

60 niveis organizados em 6 faixas (tiers) com identidade visual distinta:

| Niveis    | Nome PT     | Nome JP | Cor                  |
| --------- | ----------- | ------- | -------------------- |
| 01 - 10   | Agradavel   | 快      | Verde (seguranca)    |
| 11 - 20   | Doloroso    | 苦      | Laranja (desafio)    |
| 21 - 30   | Morte       | 死      | Vermelho (rigor)     |
| 31 - 40   | Inferno     | 地獄    | Roxo (alta dificuldade) |
| 41 - 50   | Paraiso     | 天国    | Azul claro (dominio) |
| 51 - 60   | Realidade   | 現実    | Prata (pratica)      |

### Progressao de Nivel

- Para avancar de nivel, o usuario deve completar todos os itens (radicais, kanji, vocabulario) do nivel atual ate o estagio "Guru" no SRS.
- Itens sao desbloqueados sequencialmente: Radicais -> Kanji (que usam esses radicais) -> Vocabulario (que usa esses kanji).

---

## 3. Estagios SRS (Repeticao Espacada)

Sistema de 9 estagios baseado em FSRS:

| Estagio      | Nome PT      | Nome EN       | Cor              |
| ------------ | ------------ | ------------- | ---------------- |
| 1            | Aprendiz 1   | Apprentice 1  | Rosa             |
| 2            | Aprendiz 2   | Apprentice 2  | Rosa             |
| 3            | Aprendiz 3   | Apprentice 3  | Rosa             |
| 4            | Aprendiz 4   | Apprentice 4  | Rosa             |
| 5            | Guru 1       | Guru 1        | Roxo             |
| 6            | Guru 2       | Guru 2        | Roxo             |
| 7            | Mestre       | Master        | Azul             |
| 8            | Iluminado    | Enlightened   | Amarelo          |
| 9            | Queimado     | Burned        | Cinza            |

- **Resposta correta**: Avanca 1 estagio.
- **Resposta incorreta**: Retrocede estagios (quanto mais alto, maior a penalidade).
- **Queimado**: Item completamente memorizado, nao aparece mais em revisoes.

---

## 4. Estrutura de Telas

### 4.1 Layout Comum (App Shell)

**Header (Navegacao)**:
- Esquerda: Logo "KanGo" (link para dashboard)
- Centro: Navegacao principal
  - Painel (Dashboard)
  - Licoes (Lessons)
  - Revisoes (Reviews)
  - Radicais (Radicals)
  - Kanji
  - Vocabulario (Vocabulary)
- Direita: Menu do usuario (perfil, configuracoes, logout)

**Status MVP**: Implementado com navegacao completa e menu do usuario.

---

### 4.2 Dashboard (Painel)

Tela principal apos login com visao geral do progresso.

**Componentes**:

| Componente             | Descricao                                                  | Status MVP   |
| ---------------------- | ---------------------------------------------------------- | ------------ |
| Licoes Disponiveis     | Quantidade de itens novos para estudar. Clicavel.          | Implementado |
| Revisoes Pendentes     | Quantidade de itens para revisar (SRS). Clicavel.          | Implementado |
| Nivel Atual            | Nivel + faixa atual do usuario com barra de progresso.     | Implementado |
| Progresso por Categoria| Barras de radicais/kanji/vocabulario no nivel atual.       | Implementado |
| Itens Recentes         | Ultimos itens estudados no nivel atual.                    | Implementado |
| Previsao de Revisoes   | Grafico de revisoes futuras por hora/dia.                  | Pendente     |

---

### 4.3 Tela de Licoes (Lesson Flow)

Cada sessao ensina **5 itens** em duas fases:

#### Fase 1: Aprendizado

Para cada item, exibir card detalhado com:

**Radical**:
- Caractere com fundo azul (cor da categoria)
- Nome (PT + EN)
- Nivel e faixa
- Mnemonico / historia em portugues
- Lista de kanji que usam este radical (com links)

**Kanji**:
- Caractere com fundo rosa (cor da categoria)
- Significado (PT + EN) + alternativas
- Leituras: On'yomi e Kun'yomi
- Composicao: lista de radicais que formam o kanji (com links)
- Mnemonico de significado (PT)
- Mnemonico de leitura (PT)
- Lista de vocabulario que usa este kanji (com links)

**Vocabulario**:
- Palavra com fundo roxo (cor da categoria)
- Significado (PT + EN)
- Leitura (kana)
- Tipo de palavra (substantivo, verbo, etc.)
- Explicacao de significado (PT)
- Explicacao de leitura (PT)
- Frases de contexto (japones + portugues)
- Composicao: kanji que formam a palavra (com links)

**Navegacao**: Barra inferior com indicadores de progresso (bolinhas) e botoes anterior/proximo.

#### Fase 2: Quiz

Apos estudar os 5 itens, quiz de confirmacao:

- Pergunta de **significado**: digitar o significado em portugues ou ingles.
- Pergunta de **leitura**: digitar a leitura em hiragana (para kanji e vocabulario, nao para radicais).
- Feedback visual: verde (correto) ou vermelho com shake (incorreto).
- Itens incorretos retornam ao final da fila.

#### Resultado

Tela de resumo com:
- Total correto / incorreto
- Porcentagem de acerto
- Lista de itens separados por correto/incorreto

**Status MVP**: Implementado com dados placeholder (ambas as fases).

---

### 4.4 Tela de Revisoes (Review Flow)

Quiz SRS com todos os itens pendentes de revisao.

**Fluxo**:
1. Exibir caractere centralizado com cor de fundo da categoria.
2. Indicar tipo de pergunta: "Significado" ou "Leitura".
3. Campo de input para resposta.
4. Feedback: correto (verde) / incorreto (vermelho + shake + resposta correta).
5. Barra de progresso mostrando posicao atual / total.
6. Contador de acertos/erros em tempo real.

**Itens incorretos**: Retornam ao final da fila para nova tentativa na mesma sessao.

**Tipos de pergunta por categoria**:

| Categoria    | Significado | Leitura |
| ------------ | ----------- | ------- |
| Radical      | Sim         | Nao     |
| Kanji        | Sim         | Sim     |
| Vocabulario  | Sim         | Sim     |

#### Resultado (Review Summary)

- Total de itens revisados
- Porcentagem de acerto geral
- Breakdown por categoria (radical/kanji/vocabulario)
- Lista de itens incorretos com respostas corretas

**Status MVP**: Implementado com dados placeholder.

---

### 4.5 Paginas de Navegacao (Browse)

Tres paginas de listagem com estrutura identica:

#### Radicais (/radicals)
#### Kanji (/kanji)
#### Vocabulario (/vocabulary)

**Componentes compartilhados**:
- Filtro por faixa de nivel (tabs: Agradavel, Doloroso, etc.)
- Filtro por nivel individual dentro da faixa
- Grid de cards clicaveis com:
  - Caractere grande
  - Nome/significado abaixo
  - Badge de nivel
  - Cor de fundo da categoria (azul/rosa/roxo)

**Status MVP**: Implementado com dados placeholder (6 radicais, 4 kanji, 4 vocabularios).

---

### 4.6 Paginas de Detalhe

#### Detalhe do Radical (/radicals/[id])
- Caractere, nome (PT + EN), nivel, faixa
- Mnemonico em portugues
- Lista de kanji que usam o radical (com links)

#### Detalhe do Kanji (/kanji/[id])
- Caractere, significado (PT + EN), alternativas
- Leituras On'yomi e Kun'yomi
- Composicao de radicais (com links)
- Mnemonico de significado (PT)
- Mnemonico de leitura (PT)
- Vocabulario relacionado (com links)

#### Detalhe do Vocabulario (/vocabulary/[id])
- Palavra, significado (PT + EN), leitura
- Tipo de palavra
- Explicacao de significado (PT)
- Explicacao de leitura (PT)
- Frases de contexto (JP + PT)
- Kanji que compoem a palavra (com links)

**Status MVP**: Implementado com dados placeholder.

---

### 4.7 Login / Autenticacao

- Tela de login com email/senha
- Registro de novo usuario
- Recuperacao de senha
- Perfil do usuario com progresso

**Status MVP**: Placeholder (usuario auto-logado, qualquer credencial aceita).

---

## 5. Modelo de Dados (Supabase)

### 5.1 Tabelas Principais

```
levels
  - id: integer (1-60)
  - tier: text (pleasant, painful, death, hell, paradise, reality)

radicals
  - id: uuid
  - character: text
  - name: text (EN)
  - name_pt: text (PT)
  - level: integer (FK -> levels.id)
  - mnemonic: text (EN)
  - mnemonic_pt: text (PT)

kanji
  - id: uuid
  - character: text
  - meaning: text (EN)
  - meaning_pt: text (PT)
  - alternatives: text[] (sinonimos aceitos)
  - level: integer (FK -> levels.id)
  - onyomi: text[]
  - kunyomi: text[]
  - meaning_mnemonic: text (EN)
  - meaning_mnemonic_pt: text (PT)
  - reading_mnemonic: text (EN)
  - reading_mnemonic_pt: text (PT)

kanji_radicals (N:N)
  - kanji_id: uuid (FK -> kanji.id)
  - radical_id: uuid (FK -> radicals.id)

vocabulary
  - id: uuid
  - word: text
  - reading: text (kana)
  - meaning: text (EN)
  - meaning_pt: text (PT)
  - word_type: text
  - level: integer (FK -> levels.id)
  - meaning_explanation: text (EN)
  - meaning_explanation_pt: text (PT)
  - reading_explanation: text (EN)
  - reading_explanation_pt: text (PT)
  - context_sentences: jsonb

vocabulary_kanji (N:N)
  - vocabulary_id: uuid (FK -> vocabulary.id)
  - kanji_id: uuid (FK -> kanji.id)
```

### 5.2 Tabelas de Progresso do Usuario

```
user_profiles
  - id: uuid (FK -> auth.users.id)
  - display_name: text
  - current_level: integer
  - created_at: timestamp

user_item_progress
  - id: uuid
  - user_id: uuid (FK -> user_profiles.id)
  - item_id: uuid (radical/kanji/vocabulary)
  - item_type: text (radical, kanji, vocabulary)
  - srs_stage: integer (0-9)
  - next_review_at: timestamp
  - correct_count: integer
  - incorrect_count: integer
  - unlocked_at: timestamp
  - burned_at: timestamp (nullable)
```

### 5.3 RLS (Row Level Security)

- Todas as tabelas de conteudo (radicals, kanji, vocabulary): leitura publica.
- Tabelas de progresso (user_item_progress, user_profiles): apenas o proprio usuario.

**Status**: Pendente (MVP usa dados estaticos em lib/data.ts).

---

## 6. Cores por Categoria de Item

| Categoria    | Cor de Fundo   | CSS Token          |
| ------------ | -------------- | ------------------ |
| Radical      | Azul           | `--radical`        |
| Kanji        | Rosa           | `--kanji`          |
| Vocabulario  | Roxo           | `--vocabulary`     |

---

## 7. Funcionalidades Pendentes (Pos-MVP)

| Funcionalidade                         | Prioridade |
| -------------------------------------- | ---------- |
| Integracao com Supabase (DB real)      | Alta       |
| Autenticacao com Supabase Auth         | Alta       |
| Algoritmo FSRS completo               | Alta       |
| Dados completos (60 niveis)            | Alta       |
| Audio de pronuncia (JP)               | Media      |
| Grafico de previsao de revisoes        | Media      |
| Sistema de sinonimos do usuario        | Media      |
| Notas pessoais por item                | Media      |
| Configuracoes do usuario               | Media      |
| Tema escuro / claro (toggle)           | Baixa      |
| PWA / Mobile optimization              | Baixa      |
| Gamificacao (streaks, badges)          | Baixa      |
| Exportacao de progresso                | Baixa      |

---

## 8. Estrutura de Arquivos (Atual)

```
app/
  layout.tsx                    # Root layout (fontes, providers)
  page.tsx                      # Redirect -> /dashboard
  globals.css                   # Design tokens e tema
  login/page.tsx                # Login (placeholder)
  (app)/
    layout.tsx                  # App shell (header + main)
    dashboard/page.tsx          # Dashboard
    lessons/page.tsx            # Sessao de licoes
    reviews/page.tsx            # Sessao de revisoes
    radicals/page.tsx           # Listagem de radicais
    radicals/[id]/page.tsx      # Detalhe do radical
    kanji/page.tsx              # Listagem de kanji
    kanji/[id]/page.tsx         # Detalhe do kanji
    vocabulary/page.tsx         # Listagem de vocabulario
    vocabulary/[id]/page.tsx    # Detalhe do vocabulario

components/
  app-header.tsx                # Header com navegacao
  dashboard-stats.tsx           # Cards de estatisticas
  dashboard-level-progress.tsx  # Progresso do nivel
  dashboard-recent-items.tsx    # Itens recentes
  item-grid.tsx                 # Grid reutilizavel de items
  level-filter.tsx              # Filtro por faixa/nivel
  lesson-session.tsx            # Componente de licao (2 fases)
  review-session.tsx            # Componente de revisao (quiz)
  review-summary.tsx            # Resultado da revisao

lib/
  data.ts                       # Dados placeholder (tipos + samples)
  auth-context.tsx              # Contexto de autenticacao (placeholder)
  utils.ts                      # Utilitarios (cn)

docs/
  requirements.md               # Este documento
```
