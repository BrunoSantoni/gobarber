![GoBarber](web/src/assets/logo.svg?raw=true "Go Barber")

### GoBarber é uma aplicação web/mobile que visa gerenciar os agendamentos em salões de beleza e barbearias, buscando facilitar a vida dos prestadores de serviço na hora de organizarem a agenda.

# Como executar

### Clone o repositório utilizando o comando:
```git clone https://github.com/BrunoSantoni/gobarber.git```

## Servidor
1 - Crie uma instância do Postgres no Docker, e um banco de dados chamado **gobarber**, e execute o Docker;<br/>
2 - Abra a pasta *server* e rode o comando: ```yarn``` para instalar as dependências;<br/>
3 - Após o término da instalação das dependências e com a instância do Docker executando, utilize o comando ```yarn dev:server``` para iniciar o servidor na porta **3333**.

## Web
1 - Abra a pasta *web* e rode o comando: ```yarn``` para instalar as dependências;<br/>
2 - Execute ```yarn start``` para rodar o projeto localmente na porta **3000**.

## Mobile
1 - Abra a pasta *mobile* e rode o comando: ```yarn``` para instalar as dependências;<br/>
2 - Vá até o caminho *src/services* e abra o *api.ts*;<br/>
3 - Edite a palavra "localhost" no baseURL contido na linha 4, baseado no dispositivo que estiver utilizando, segue a lista:<br/>
### iOS no emulador: localhost
### iOS no dispositivo físico: IP da máquina
### Android usando Android Studio: 10.0.2.2
### Android usando Genymotion: 10.0.3.2
### Android no dispositivo físico: IP da máquina

*Obs: usando o Android Studio, pode-se rodar o comando ```adb reverse tcp:3333 tcp:3333``` no terminal para não precisar usar o IP, mantendo assim o localhost.*