# Teste Prático

## API de Gerenciamento de Tarefas com Autenticação

### Contexto

Criar um sistema simples onde usuários podem se cadastrar, fazer login e gerenciar tarefas (CRUD). Frontend em React Native apenas consome a API (pode ser bem básico: listar tarefas e marcar como concluída).

### Escopo

#### Backend (Python/FastAPI)

- Autenticação JWT (login + rota protegida)
- CRUD de tarefas (criar, listar, atualizar, deletar)
- Relacionamento: usuário tem muitas tarefas
- Migrations (Alembic)
- Testes unitários das regras de negócio (opcional, mas valorizado)

#### Frontend (React Native)

- Tela de login (email + senha)
- Tela de listagem de tarefas (com pull-to-refresh)
- Botão para marcar tarefa como concluída
- (Não precisa de CRUD completo no front — só leitura e update de status)

#### Infraestrutura

- Dockerfile para a API
- docker-compose.yml com API + PostgreSQL
- Variáveis de ambiente (.env.example)

### Critérios de aceitação

- O docker-compose up sobe a aplicação e banco sem erros
- É possível criar um usuário e obter token JWT
- Apenas dono da tarefa pode alterá-la
- O React Native consegue listar as tarefas do usuário logado
- Código com baixo acoplamento entre camadas (ex: use case não conhece FastAPI ou SQLAlchemy diretamente)
- Arquivo README.md com a descrição dos passos para executar o projeto

### Considerações

Para facilitar e acelerar o desenvolvimento do teste prático, não se preocupe com a implementação dos seguintes itens:

- Sistema de refresh token
- Paginação ou filtros avançados
- Testes end-to-end
- UI bonita ou animações no React Native
- CRUD completo no front (apenas listar e marcar concluída)
