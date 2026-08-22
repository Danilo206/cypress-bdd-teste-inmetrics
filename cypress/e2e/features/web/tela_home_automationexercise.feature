Feature: Página de Home do Automation Exercise
  Como usuário do site automationexercise
  Quero fazer meus pedidos
  Para que eu possa concluir minhas compras com sucesso

  Background: Acessar página de login do automationexercise
    Given que acesso a página automationexercise login e insiro dados válidos


  Scenario: Acessar página de login do automationexercise com dados válidos
    And devo ser redirecionado para a página inicial
    When clico em um item do menu produtos na lateral esquerda da página
    Then devo ser redirecionado para a página de produtos com os produtos selecionados
