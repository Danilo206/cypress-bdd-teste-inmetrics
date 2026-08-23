@insercao_produto
Feature: Página de Inserção de Produto do Automation Exercise
  Como usuário do site automationexercise
  Quero inserir produtos no carrinho
  Para que eu possa concluir minhas compras com sucesso

  Background: Acessar página de login do automationexercise
    Given que acesso a página automationexercise login e insiro dados válidos
    And devo ser redirecionado para a página inicial
    When clico no item de Products do header da página
    And insiro o nome do produto "Polo" no campo de pesquisa
    And clico no botão de pesquisa

  Scenario: Realizar inserção de produto no carrinho
    And devo ser redirecionado para a página de produtos com os produtos selecionados
    When clico no botão de view product
    And clico no botão Add to cart
    Then o modal de produto adicionado ao carrinho deve ser exibido
