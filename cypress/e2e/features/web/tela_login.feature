@login
Feature: Página de Login e Home do Automation Exercise
  Como usuário do site automationexercise
  Quero fazer minha autenticação no sistema
  Para que eu possa ter acesso ao sistema do Automation Exercise

  Scenario Outline: Realizar login do sistema automationexercise com dados inválidos
    Given que acesso a página automationexercise <login> e <password> com dados inválidos
    Then devo ver uma mensagem de erro

    Examples:
      | login                 | password  |
      | invalido@teste.com.br | teste     |
      | teste2021@teste.com.br| abc123    |

  Scenario: Realizar login do sistema automationexercise com dados válidos
    Given que acesso a página automationexercise login e insiro dados válidos
    Then devo ser redirecionado para a página inicial

  

