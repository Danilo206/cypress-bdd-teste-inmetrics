@insercao_produto @regression
Feature: Página de Inserção de Produto do Automation Exercise
  Como usuário do site automationexercise
  Quero inserir produtos no carrinho
  Para que eu possa concluir minhas compras com sucesso

  Background: Acessar página de login do automationexercise
    Given que acesso a página automationexercise login e insiro dados válidos
    And devo ser redirecionado para a página inicial
    And busco pelo produto "Polo"

  Scenario: Realizar inserção de produto no carrinho
    When seleciono o produto "Polo" e adiciono ao carrinho
    Then o modal de produto adicionado ao carrinho deve ser exibido
