Feature: Página de Home do Automation Exercise
  Como usuário do site automationexercise
  Quero fazer meus pedidos
  Para que eu possa concluir minhas compras com sucesso

  Scenario Outline: Realizar login do sistema automationexercise com dados inválidos
    Given que acesso a página automationexercise <login> e <password> com dados inválidos
    Then devo ver uma mensagem de erro

    Examples:
      | login                 | password  |
      | invalido@teste.com.br | teste     |
      | teste2021@teste.com.br| abc123    |

  Scenario: Realizar login do sistema automationexercise com dados faltantes
    Given que acesso a página automationexercise <login> e <password> com dados faltantes
    Then devo ver uma mensagem de erro de falta de preencimento de campos obrigatórios

    Examples:
      | login                 | password  |
      | teste2021@teste.com.br|           |
      |                       | teste     |

  Scenario: Realizar login do sistema automationexercise com dados válidos
    Given que acesso a página automationexercise login e insiro dados válidos
    Then devo ser redirecionado para a página inicial

  

