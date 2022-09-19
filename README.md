Projeto criado para teste de conhecimento de senioridade.

É necessário ter o node,nest,docker e docker-compose instalado.

Para iniciar o projeto basta:

Executar o comando npm install
Executar o comando ' (sudo?) docker-compose up ' para subir o banco de dados mysql (Lembrar de trocar as credenciais do banco de dados)
Executar o comando ' npx prisma migrate dev ' para criar a tabela no banco de dados
Executar o comando ' nest start --watch ' ou executar o snippet DEBUG DEV para ter acesso ao console de depuração do VSCODE
