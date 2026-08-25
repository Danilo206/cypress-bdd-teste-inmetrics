@carrinho @regression
Feature: Página de Carrinho do Automation Exercise
  Como usuário do site automationexercise
  Quero verificar os produtos inseridos no carrinho
  Para que eu possa concluir minhas compras com sucesso

  Background: Acessar página de login do automationexercise
    Given que acesso a página automationexercise login e insiro dados válidos
    And devo ser redirecionado para a página inicial

  @smoke
  Scenario: Realizar inserção de produto no carrinho
    When clico no item de Products do header da página
    And insiro o nome do produto "Polo" no campo de pesquisa
    And clico no botão de pesquisa
    Then devo ser redirecionado para a página de produtos com os produtos selecionados
    When clico no botão de view product
    And clico no botão Add to cart
    And clico no link View Cart
    Then visualizo os produtos inseridos com sucesso

  @smoke
  Scenario: Realizar inserção de produto na tela de checkout
    When clico no item de Products do header da página
    And insiro o nome do produto "Polo" no campo de pesquisa
    And clico no botão de pesquisa
    Then devo ser redirecionado para a página de produtos com os produtos selecionados
    When clico no botão de view product
    And clico no botão Add to cart
    And clico no link View Cart
    When clico no botão de checkout
    Then visualizo os produtos inseridos em checkout com sucesso

  Scenario: Visualizar carrinho vazio
    Given que acesso a página de carrinho sem produtos
    Then visualizo mensagem de carrinho vazio

  Scenario: Remover produto do carrinho
    When clico no item de Products do header da página
    And insiro o nome do produto "Polo" no campo de pesquisa
    And clico no botão de pesquisa
    Then devo ser redirecionado para a página de produtos com os produtos selecionados
    When clico no botão de view product
    And clico no botão Add to cart
    And clico no link View Cart
    When removo o produto do carrinho
    Then visualizo mensagem de carrinho vazio
