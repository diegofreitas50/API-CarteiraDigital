# API-CarteiraDigital

## Descrição

- API de uma carteira digital, Temos 2 tipos de usuários, os comuns e lojistas, ambos têm carteira com dinheiro e realizam transferências entre eles.

- Para ambos tipos de usuário, precisamos do Nome Completo, CPF, e-mail e Senha. CPF/CNPJ e e-mails devem ser únicos no sistema. Sendo assim, seu sistema deve permitir apenas um cadastro com o mesmo CPF ou endereço de e-mail.

- Usuários podem enviar dinheiro (efetuar transferência) para lojistas e entre usuários.

- Lojistas só recebem transferências, não enviam dinheiro para ninguém.

- Apenas logistas podem estornar uma transação antes realizada.

- Deploy da aplicação ainda em andamento/ Deve ser rodado em localhost.

- Necessário Banco de Dados, de preferencia PostgresSQL.

## Para clonar o projeto

```
https://github.com/diegofreitas50/API-CarteiraDigital
```

## Para instalação

```
yarn i
```

## Para criar tabelas no banco de dados local

```
yarn prisma db push
```

## Para rodar o app

```
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Para testar o app no Swagger

```
http://localhost:3000/api/
```

## Priscipais ferramentas utilizadas

* NodeJS
* TypeScript
* NestJS
* PostgreSQL
* Swagger
* Yarn
* JWT
* Bcrypt

## Autor

* **Diego Freitas** - [Github](https://github.com/diegofreitas50), [Linkedin](https://www.linkedin.com/in/diegofreitas50/)

## Licença

Este projeto está sob a licença: Mozilla Public License Version 2.0 - veja o arquivo [LICENSE.md](https://github.com/diegofreitas50/API-CarteiraDigital/blob/main/LICENSE) para detalhes.
