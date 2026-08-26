@login @regression
Feature: Página de Login e Home do Automation Exercise
  Como usuário do site automationexercise
  Quero fazer minha autenticação no sistema
  Para que eu possa ter acesso ao sistema do Automation Exercise

  Scenario: Realizar login do sistema automationexercise com dados inválidos
    Given que acesso a página automationexercise com login "invalido@teste.com.br" e senha "teste" inválidos
    Then devo ver uma mensagem de erro

  Scenario: Realizar login do sistema automationexercise com dados válidos
    Given que acesso a página automationexercise login e insiro dados válidos
    Then devo ser redirecionado para a página inicial

  Scenario: Realizar login do sistema automationexercise com massa de dados inexistente
    Given que acesso a página automationexercise com credenciais aleatórias inválidas
    Then devo ver uma mensagem de erro


