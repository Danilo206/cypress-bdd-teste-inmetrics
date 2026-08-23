@contrato_trello
Feature: Contrato da API do Trello
  Como usuário do trello
  Quero fazer minha validação de contrato da API do Trello
  Para verificar se a API do Trello está funcionando corretamente

  Scenario Outline: Realizar GET do sistema Trello para validar o contrato da API com dados válidos
    Given que realizo uma requisição GET para a API do Trello com dados válidos
    Then devo receber a resposta de sucesso com código 200
    And o contrato da API deve ser validado com sucesso

  Scenario: Realizar GET do sistema Trello para validar o contrato da API com dados inválidos
    Given que realizo uma requisição GET para a API do Trello com dados inválidos
    Then devo receber a resposta de erro com código 400
    And o contrato de da API deve ser validado com sucesso
