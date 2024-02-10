**README - Sistema de Gestão de Produtos e Usuários**

Este projeto consiste em um sistema de gestão de produtos e usuários, onde é possível cadastrar, editar, visualizar e gerenciar produtos e usuários, além de permitir a interação entre eles através de envio de joias e resgate de produtos.

*ENTIDADES*
    1. Usuários:
       * Clientes
       * Admin

    2. Products

*Tecnologias Utilizadas*
     * Node 18
     * Typescript
     * Express
     * Mongoose
     * Jest
     * Node-cron
     * Swagger
     * Yup
     * Bcrypt


*Banco de Dados*
Foi utilizado o MongoDB Atlas para essa aplicação. É necessário possuir uma conta em https://mongodb.com/ e substituir a string de conexão no arquivo .env pela sua string de conexão.

*Variáveis de Ambiente*
Observar o arquivo ".envexample" na aplicação e criar o seu próprio arquivo .env seguindo o mesmo modelo de variáveis, preenchendo a sua string de conexão do MongoDB, a porta pela qual será feita a conexão da sua api, e uma chave secreta aleatória para a geração do token.

Exemplo:

MONGO_URL="mongodb+srv://ReservaBP:reserva1234@reservabp.iegh89o.mongodb.net/"
PORT=3030
JWT_SECRET_KEY=1a908sdf7as8df

*Rotas do Insomnia*
Exemplos de chamadas das rotas usando o Insomnia no arquivo "Insomnia_routes.json" na raíz da aplicação, e poderão ser importados para o seu Insomnia para uso.

*Comandos*
Siga os passos abaixo para instalar, configurar e executar a aplicação localmente.

1. Instalar:

*Entre na pasta api e execute o seguinte comando:
npm i

Rodar a aplicação localmente:

*Execute o seguinte comando para iniciar a aplicação em modo de desenvolvimento:
npm run dev