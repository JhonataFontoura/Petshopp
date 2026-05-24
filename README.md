# Petshopp — Dashboard (Frontend + Backend + Banco de Dados)

Sistema de gestão de pet shop com interface React moderna, API Flask e banco MySQL/MariaDB.

---

## Funcionalidades

### Backend (API)
- Cadastrar, listar e buscar produtos
- Registrar e listar vendas (atualiza estoque automaticamente)
- **Remover produto** (exclui vendas vinculadas)
- **Remover venda** (devolve quantidade ao estoque)

### Frontend (Dashboard)
- Interface moderna, responsiva e profissional
- **Modo claro e modo escuro** (botão na navbar, preferência salva no navegador)
- Dashboard com métricas: produtos, vendas e receita total
- Cadastro de produtos com validação
- Cards de produtos com badges de estoque (ok / baixo / sem estoque)
- Botões **Vender** e **Remover** em produtos e vendas
- Modal de confirmação antes de excluir
- Notificações toast (sucesso / erro)
- Ícones SVG profissionais (estilo Lucide)
- Animações suaves de entrada e transições de tema
- Layout adaptável para mobile, tablet e desktop

---

## Caminhos no PC (Windows)

### Pasta raiz do projeto

```
C:\Users\Dyego Nunes\OneDrive\Área de Trabalho\JHONATA\Facul\Trabalhos\Projeto front-end
```

### Backend (API Flask)

```
C:\Users\Dyego Nunes\OneDrive\Área de Trabalho\JHONATA\Facul\Trabalhos\Projeto front-end\backend
```

| Arquivo | Caminho |
|---------|---------|
| Aplicação principal | `backend\app.py` |
| Conexão com o banco | `backend\database.py` |
| Rotas da API | `backend\routes.py` |
| Funções do banco | `backend\models.py` |
| Script SQL | `backend\banco.sql` |
| Teste de conexão | `backend\test_db.py` |

### Frontend (React + Vite)

```
C:\Users\Dyego Nunes\OneDrive\Área de Trabalho\JHONATA\Facul\Trabalhos\Projeto front-end\frontend
```

| Arquivo | Caminho |
|---------|---------|
| Página principal | `frontend\src\App.jsx` |
| Entrada da aplicação | `frontend\src\main.jsx` |
| HTML base | `frontend\index.html` |
| Serviço de API | `frontend\src\services\api.js` |
| Tema claro/escuro | `frontend\src\context\ThemeContext.jsx` |
| Ícones SVG | `frontend\src\components\Icons.jsx` |
| Estilos globais | `frontend\src\styles\` |

### Banco de dados (XAMPP)

| Item | Caminho |
|------|---------|
| XAMPP | `C:\xampp` |
| Dados do MySQL | `C:\xampp\mysql\data` |
| Banco do projeto | `C:\xampp\mysql\data\petshop_db` |
| phpMyAdmin (interface web) | `C:\xampp\phpMyAdmin` |

---

## URLs para acessar no navegador

| Serviço | URL | O que mostra |
|---------|-----|--------------|
| **Frontend (site)** | http://localhost:5173/ | Dashboard Petshopp (telas) |
| **Backend (API)** | http://localhost:5000/ | Mensagem: API rodando |
| **API — Produtos** | http://localhost:5000/api/produtos | Lista de produtos (JSON) |
| **API — Vendas** | http://localhost:5000/api/vendas | Lista de vendas (JSON) |
| **phpMyAdmin (BD)** | http://localhost/phpmyadmin | Gerenciar banco visualmente |

> O frontend só funciona corretamente com o **backend** e o **MySQL** ligados ao mesmo tempo.
> Se a porta 5173 estiver ocupada, o Vite pode usar **5174** — confira a URL no terminal.

---

## Interface do frontend

### Identidade visual
- Paleta voltada para pet shop: verde teal (natureza/confiança) + coral (ação/vendas)
- Tipografia **Plus Jakarta Sans** (Google Fonts)
- Efeitos: glassmorphism, sombras suaves, gradientes e hover nos cards
- Transições suaves entre modo claro e escuro

### Modo escuro
- Ative pelo botão **lua/sol** no canto superior direito da navbar
- A preferência é salva em `localStorage` (`petshopp-theme`)
- Respeita `prefers-color-scheme` do sistema na primeira visita

### Componentes reutilizáveis (`frontend/src/components/`)

| Componente | Descrição |
|------------|-----------|
| `Navbar.jsx` | Barra superior fixa com logo, links e toggle de tema |
| `Button.jsx` | Botões padronizados (primary, secondary, danger, outline) |
| `Input.jsx` | Campos de formulário com label acessível |
| `StatCard.jsx` | Cards de métricas do dashboard |
| `ProductForm.jsx` | Formulário de cadastro de produto |
| `ProductCard.jsx` | Card de produto com ações Vender/Remover |
| `SaleCard.jsx` | Item do histórico de vendas |
| `EmptyState.jsx` | Estado vazio quando não há dados |
| `ConfirmModal.jsx` | Modal de confirmação de exclusão |
| `Toast.jsx` | Notificação flutuante de feedback |
| `FadeIn.jsx` | Animação de entrada suave |
| `Icons.jsx` | Ícones SVG (estilo Lucide, sem dependência externa) |

### Organização do CSS (`frontend/src/styles/`)

| Arquivo | Conteúdo |
|---------|----------|
| `variables.css` | Design tokens: cores, tipografia, espaçamentos, sombras |
| `global.css` | Reset, estilos base e imports |
| `components.css` | Navbar, botões, cards, formulários, modal, toast |
| `layout.css` | Grid do dashboard e breakpoints responsivos |
| `animations.css` | Animações, stagger e transições de tema |

### Comportamento das exclusões

| Ação | Efeito |
|------|--------|
| Remover produto | Apaga o produto e todas as vendas vinculadas a ele |
| Remover venda | Apaga a venda e devolve a quantidade ao estoque do produto |

---

## Pré-requisitos

Instale antes de rodar o projeto:

- [Python 3](https://www.python.org/downloads/) (3.10 ou superior)
- [Node.js](https://nodejs.org/) (LTS recomendado)
- [XAMPP](https://www.apachefriends.org/) (MySQL/MariaDB + phpMyAdmin)

### Pacotes Python (backend)

```powershell
pip install flask flask-cors mysql-connector-python
```

### Pacotes Node (frontend)

```powershell
cd frontend
npm install
```

---

## Como rodar o projeto (passo a passo)

Abra **3 terminais** (ou use o XAMPP + 2 terminais). A ordem recomendada é:

### 1. Banco de dados (MySQL)

1. Abra o **XAMPP Control Panel** (`C:\xampp\xampp-control.exe`)
2. Clique em **Start** ao lado de **MySQL**
3. Aguarde o status ficar verde

**Testar conexão:**

```powershell
cd "C:\Users\Dyego Nunes\OneDrive\Área de Trabalho\JHONATA\Facul\Trabalhos\Projeto front-end\backend"
python test_db.py
```

Se aparecer `CONEXÃO: <mysql.connector...>`, está OK.

**Criar banco e tabelas (primeira vez ou se o banco não existir):**

- Abra http://localhost/phpmyadmin
- Vá em **SQL** e execute o conteúdo de `backend\banco.sql`

Ou pelo terminal:

```powershell
C:\xampp\mysql\bin\mysql.exe -u root < "C:\Users\Dyego Nunes\OneDrive\Área de Trabalho\JHONATA\Facul\Trabalhos\Projeto front-end\backend\banco.sql"
```

### 2. Backend (Flask)

```powershell
cd "C:\Users\Dyego Nunes\OneDrive\Área de Trabalho\JHONATA\Facul\Trabalhos\Projeto front-end\backend"
python app.py
```

Saída esperada:

```
* Running on http://127.0.0.1:5000
```

**Testar no navegador:** http://localhost:5000/

### 3. Frontend (React + Vite)

```powershell
cd "C:\Users\Dyego Nunes\OneDrive\Área de Trabalho\JHONATA\Facul\Trabalhos\Projeto front-end\frontend"
npm run dev
```

Saída esperada:

```
➜  Local:   http://localhost:5173/
```

**Abrir o site:** http://localhost:5173/

---

## Configuração do banco de dados

Arquivo: `backend\database.py`

| Campo | Valor padrão (XAMPP) |
|-------|----------------------|
| Host | `localhost` |
| Usuário | `root` |
| Senha | *(vazia)* |
| Banco | `petshop_db` |
| Porta | `3306` |

Se você definir senha no MySQL, altere o campo `password` em `database.py`.

---

## Estrutura do banco (`petshop_db`)

### Tabela `produtos`

| Coluna | Tipo |
|--------|------|
| id | INT (PK, auto increment) |
| nome | VARCHAR(100) |
| preco | DECIMAL(10,2) |
| quantidade_estoque | INT |
| criado_em | TIMESTAMP |

### Tabela `vendas`

| Coluna | Tipo |
|--------|------|
| id | INT (PK, auto increment) |
| produto_id | INT (FK → produtos) |
| quantidade | INT |
| total | DECIMAL(10,2) |
| data_venda | TIMESTAMP |

---

## API — Endpoints

Base: `http://localhost:5000/api`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/produtos` | Lista todos os produtos |
| POST | `/produtos` | Cadastra produto |
| GET | `/produtos/<id>` | Busca produto por ID |
| DELETE | `/produtos/<id>` | Remove produto e vendas vinculadas |
| GET | `/vendas` | Lista todas as vendas |
| POST | `/vendas` | Registra uma venda |
| DELETE | `/vendas/<id>` | Remove venda e devolve estoque |

### Exemplo — cadastrar produto (POST)

```json
{
  "nome": "Ração Premium",
  "preco": 89.90,
  "quantidade_estoque": 50
}
```

### Exemplo — registrar venda (POST)

```json
{
  "produto_id": 1,
  "quantidade": 2
}
```

---

## Portas utilizadas

| Serviço | Porta |
|---------|-------|
| MySQL (XAMPP) | 3306 |
| Backend Flask | 5000 |
| Frontend Vite | 5173 |
| Apache/phpMyAdmin (XAMPP) | 80 |

---

## Problemas comuns

### `AttributeError: 'NoneType' object has no attribute 'cursor'`

- O MySQL **não está rodando** ou a **senha** em `database.py` está errada.
- Solução: inicie o MySQL no XAMPP e confira `database.py`.

### `Can't connect to MySQL server on 'localhost:3306'`

- MySQL parado no XAMPP.
- Solução: XAMPP Control Panel → **Start** em MySQL.

### MySQL não inicia no XAMPP (`Incorrect file format 'db'`)

- Tabelas internas do MySQL corrompidas.
- Solução: restaurar a pasta `mysql` a partir de `C:\xampp\mysql\backup\mysql` (com MySQL parado).

### Frontend abre, mas não lista produtos

- Backend não está rodando.
- Solução: execute `python app.py` na pasta `backend`.

### Erro `Access denied for user 'root'`

- Senha do MySQL diferente da configurada em `database.py`.
- No XAMPP padrão a senha do `root` é vazia (`''`).

### Erro `npm` / certificado SSL ao instalar pacotes

- Erro comum: `UNABLE_TO_VERIFY_LEAF_SIGNATURE`.
- O projeto funciona **sem pacotes extras** (ícones e animações são nativos).
- Para instalar bibliotecas opcionais depois:
  ```powershell
  cd frontend
  node --use-system-ca "$(where.exe npm)" install lucide-react framer-motion
  ```

### Porta 5173 já em uso

- O Vite tenta a próxima porta disponível (ex.: **5174**).
- Confira a URL exibida no terminal após `npm run dev`.

---

## Estrutura do projeto

```
Projeto front-end/
├── README.md
├── backend/
│   ├── app.py
│   ├── database.py
│   ├── models.py          # inclui remover_produto e remover_venda
│   ├── routes.py          # inclui DELETE /produtos e DELETE /vendas
│   ├── banco.sql
│   └── test_db.py
└── frontend/
    ├── package.json
    ├── index.html
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── context/
        │   └── ThemeContext.jsx    # modo claro/escuro
        ├── services/
        │   └── api.js              # chamadas centralizadas à API
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Button.jsx
        │   ├── Input.jsx
        │   ├── StatCard.jsx
        │   ├── ProductForm.jsx
        │   ├── ProductCard.jsx
        │   ├── SaleCard.jsx
        │   ├── EmptyState.jsx
        │   ├── ConfirmModal.jsx
        │   ├── Toast.jsx
        │   ├── FadeIn.jsx
        │   └── Icons.jsx
        └── styles/
            ├── variables.css
            ├── global.css
            ├── components.css
            ├── layout.css
            └── animations.css
```

> Arquivos legados não utilizados pelo React: `frontend/css/styles.css` e `frontend/js/script.js`.

---

## Resumo rápido

1. **XAMPP** → Start **MySQL**
2. **Terminal 1** → `cd backend` → `python app.py`
3. **Terminal 2** → `cd frontend` → `npm run dev`
4. **Navegador** → http://localhost:5173/

---

## Tecnologias

- **Frontend:** React 19, Vite, CSS modular (design tokens + componentes)
- **UI/UX:** modo escuro, glassmorphism, animações CSS, ícones SVG
- **Backend:** Flask, Flask-CORS
- **Banco:** MySQL / MariaDB (XAMPP)
- **Conexão:** mysql-connector-python

### Bibliotecas visuais opcionais (não obrigatórias)

| Biblioteca | Uso |
|------------|-----|
| `lucide-react` | Ícones SVG (substituir `Icons.jsx`) |
| `framer-motion` | Animações avançadas (substituir `FadeIn.jsx`) |

O projeto já inclui alternativas nativas para ambas, sem necessidade de instalação.
