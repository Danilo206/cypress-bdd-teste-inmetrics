@busca @regression
Feature: Página de Busca
  Como usuário do site automationexercise
  Quero fazer uma busca de produtos
  Para que eu possa ver todas as opções de produtos disponíveis no site

  Background: Acessar página de login do automationexercise
    Given que acesso a página automationexercise login e insiro dados válidos

  Scenario: Realizar busca de produto por meio do sidebar lateral esquerda da página
    And devo ser redirecionado para a página inicial
    When clico em um item do menu produtos na lateral esquerda da página
    Then devo ser redirecionado para a página de produtos com os produtos selecionados

  Scenario: Realizar busca de produto por meio do campo de busca com dados válidos
    And devo ser redirecionado para a página inicial
    When clico no item de Products do header da página
    And insiro o nome do produto "Polo" no campo de pesquisa
    And clico no botão de pesquisa
    Then devo ser redirecionado para a página de produtos com os produtos selecionados

  Scenario: Realizar busca de produto por meio do campo de busca com dados inválidos
    And devo ser redirecionado para a página inicial
    When clico no item de Products do header da página
    And insiro o nome do produto "Produto Inexistente" no campo de pesquisa
    And clico no botão de pesquisa
    Then devo ser redirecionado para a página de produtos sem exibir produtos
