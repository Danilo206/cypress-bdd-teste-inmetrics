@smoke @carrinho @regression
Feature: Página de Carrinho do Automation Exercise
  Como usuário do site automationexercise
  Quero verificar os produtos inseridos no carrinho
  Para que eu possa concluir minhas compras com sucesso

  Background: Acessar página de login do automationexercise
    Given que acesso a página automationexercise login e insiro dados válidos
    And devo ser redirecionado para a página inicial

  Scenario: Realizar inserção de produto no carrinho
    Given que adiciono o produto Polo ao carrinho
    Then visualizo os produtos inseridos com sucesso

  Scenario: Realizar inserção de produto na tela de checkout
    Given que adiciono o produto Polo ao carrinho
    When clico no botão de checkout
    Then visualizo os produtos inseridos em checkout com sucesso

  Scenario: Visualizar carrinho vazio
    Given que acesso a página de carrinho sem produtos
    Then visualizo mensagem de carrinho vazio

  Scenario: Remover produto do carrinho
    Given que adiciono o produto Polo ao carrinho
    When removo o produto do carrinho
    Then visualizo mensagem de carrinho vazio
