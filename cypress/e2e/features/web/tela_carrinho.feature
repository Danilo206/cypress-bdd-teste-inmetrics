@carrinho
Feature: Página de Carrinho do Automation Exercise
  Como usuário do site automationexercise
  Quero verificar os produtos inseridos no carrinho
  Para que eu possa concluir minhas compras com sucesso

  Background: Acessar página de login do automationexercise
    Given que acesso a página de carrinho

  Scenario: Realizar inserção de produto no carrinho
    Then visualizo os produtos inseridos com sucesso

  Scenario: Realizar inserção de produto na tela de checkout
    When clico no botão de checkout
    Then visualizo os produtos inseridos em checkout com sucesso
