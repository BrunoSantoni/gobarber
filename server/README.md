# FUNCIONALIDADES
# Atualização do perfil
**REQUISITOS FUNCIONAIS**

- O usuário poderá atualizar seu nome, e-mail e senha.

**REGRAS DE NEGÓCIO**

- O usuário não poderá alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usuário deverá informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha.

# Recuperação de senha
**REQUISITOS FUNCIONAIS**

- O usuário poderá recuperar sua senha informando o seu e-mail;
- O usuário deverá receber um e-mail com instruções de recuperação de senha;
- O usuário poderá resetar sua senha.

**REQUISITOS NÃO FUNCIONAIS**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job).

**REGRAS DE NEGÓCIO**

- O link enviado por e-mail para resetar a senha, deve expirar em 1h;
- O usuário precisa confirmar a nova senha ao resetá-la.

# Painel do prestador
**REQUISITOS FUNCIONAIS**

- O usuário poderá listar seus agendamentos de um dia específico;
- O prestador deverá receber uma notificação sempre que houver um novo agendamento;
- O prestador poderá visualizar as notificações não lidas.

**REQUISITOS NÃO FUNCIONAIS**

- Os agendamentos do prestador no dia deverão ser armazenados em cache;
- As notificações do prestador deverão ser armazenadas no MongoDB;
- As notificações do prestador deverão ser enviadas em tempo real utilizando Socket.io;

**REGRAS DE NEGÓCIO**

- A notificação deve ter um status de lida ou não para que o prestador possa controlar.

# Agendamento de serviços
**REQUISITOS FUNCIONAIS**

- O usuário poderá listar todos os prestadores de serviço cadastrados;
- O usuário poderá listar os dias de um mês com pelo menos um horário disponível de um prestador específico;
- O usuário poderá listar os horários disponíveis em um dia específico de um prestador;
- O usuário poderá realizar um novo agendamento com um prestador.

**REQUISITOS NÃO FUNCIONAIS**

- A listagem de prestadores deve ser armazenada em cache;

**REGRAS DE NEGÓCIO**

- Cada agendamento deve durar 1h/30m exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h;
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
