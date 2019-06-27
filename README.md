# Restaurante

Essa aplicação foi desenvolvida em .Net Core 2.2 e Angular 8. Seguem algumas considerações abaixo.

## Banco de Dados

Foi utilizado o SQL Server e o Migrations para manter o histórico de alterações do Model. Para criar/atualizar o banco de dados, modifique a ConnectionString Base no arquivo appsettings.json do projeto RestauranteApi e execute o comando `dotnet ef database update` no diretório do projeto. 

## Estrutura de Diretórios - Front-End

A organização do projeto Angular foi baseada no artigo [How to define a highly scalable folder structure for your Angular project](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7).

## HttpErrorMiddleware

No projeto .Net Core, foi criado um Middleware para capturar as Exceções globalmente, e de acordo com a Exceção definir o HTTP Status Code e a mensagem de erro da resposta da requisição. Por esse motivo, existem métodos nos Controllers sem Try-Catch, já que o Middleware fará a captura da Exceção lançada pela camada de serviço.
(Obs.: no modo de Debug do Visual Studio, antes do tratamento da Exceção pelo Middleware a execução pode ser interrompida quando a Exceção for lançada. Nesse caso, basta marcar a caixa restaurante-api.dll abaixo de "Break when this exception type is user-unhandled Except when thrown from", conform imagem abaixo. Executando a aplicação diretamente pelo comando `dotnet run` não há esse problema.)

## PaginationAttribute

Foi criado o ResultFilter PaginationAttribute para faciliar paginação de registros.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
