@busca @regression
Feature: Página de Busca
  Como usuário do site automationexercise
  Quero fazer uma busca de produtos
  Para que eu possa ver todas as opções de produtos disponíveis no site

  Background: Acessar página de login do automationexercise
    Given que acesso a página automationexercise login e insiro dados válidos
    And devo ser redirecionado para a página inicial

  Scenario: Realizar busca de produto por meio do sidebar lateral esquerda da página
    When clico em um item do menu produtos na lateral esquerda da página
    Then devo ser redirecionado para a página de produtos com os produtos selecionados

  Scenario: Realizar busca de produto por meio do campo de busca com dados válidos
    When busco pelo produto "Polo"
    Then devo ser redirecionado para a página de produtos com os produtos selecionados

  Scenario: Realizar busca de produto por meio do campo de busca com dados inválidos
    When busco pelo produto "Produto Inexistente"
    Then devo ser redirecionado para a página de produtos sem exibir produtos
