Feature: Página de Home do Automation Exercise
  Como usuário do site automationexercise
  Quero fazer meus pedidos
  Para que eu possa concluir minhas compras com sucesso

  Background: Acessar página de login do automationexercise
    Given que acesso a página de carrinho

  Scenario: Realizar inserção de produto no carrinho
    Then visualizo os produtos inseridos com sucesso
