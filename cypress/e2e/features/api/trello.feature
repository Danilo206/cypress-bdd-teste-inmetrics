@api_trello @regression
Feature: API do Trello
  Como usuário do trello
  Quero fazer minhas pesquisas com sucesso
  Para verificar se a API do Trello está funcionando corretamente

  Scenario Outline: Realizar GET do sistema Trello com dados válidos
    Given que realizo uma requisição GET para a API do Trello com dados válidos
    Then devo receber a resposta de sucesso com código 200
    And o campo name devidamente preenchido

  Scenario: Realizar GET do sistema Trello com dados inválidos
    Given que realizo uma requisição GET para a API do Trello com dados inválidos
    Then devo receber a resposta de erro com código 400
    And o campo name não deve ser preenchido
    And e a mensagem de erro deve ser enviada

  Scenario: Realizar GET do sistema Trello sem dados
    Given que realizo uma requisição GET para a API do Trello sem dados
    Then devo receber a resposta de erro com código 404
    And o campo name não deve ser preenchido
    And e a mensagem de erro deve ser enviada

  Scenario Outline: Realizar GET do sistema Trello variando o header Accept
    Given que realizo uma requisição GET para a API do Trello com dados válidos e o header Accept "<accept>"
    Then devo receber a resposta de sucesso com código 200
    And o campo name devidamente preenchido
    And o header content-type da resposta deve conter "application/json"

    Examples:
      | accept           |
      | application/json |
      | */*              |
      | text/html        |

  Scenario: Realizar GET do sistema Trello com header customizado adicional
    Given que realizo uma requisição GET para a API do Trello com dados válidos e um header customizado "X-Teste-Automacao" definido como "cypress-bdd-inmetrics"
    Then devo receber a resposta de sucesso com código 200
    And o campo name devidamente preenchido
