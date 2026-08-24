# Cypress BDD - Testes de API e Web

Projeto de automação de testes end-to-end com Cypress, Cucumber BDD, TypeScript e integração de relatórios Allure.

## Objetivo

Este projeto tem como foco validar cenários de:

- aplicação web do AutomationExercise
- APIs do Trello
- contratos de resposta de API
- execução automatizada em CI/CD

## Tecnologias

- Cypress
- Cucumber BDD
- TypeScript
- Node.js
- Allure Report
- GitHub Actions

## Requisitos

- Node.js 20+
- npm
- Java 17+ (necessário para geração do relatório Allure)

## Instalação

No diretório do projeto, execute:

```powershell
npm install
```

## Variáveis de ambiente

O projeto usa secrets na pipeline do GitHub Actions, mas também aceita variáveis locais para execução manual em ambiente de desenvolvimento.

Se quiser rodar localmente, crie um arquivo `.env` na raiz do projeto com as variáveis necessárias:

```env
AUTOMATIONEXERCISE_EMAIL=seu_email
AUTOMATIONEXERCISE_PASSWORD=sua_senha
TRELLO_ACTION_ID=seu_id_do_trello
```

ou, se preferir, pode passar a URL completa do Trello:

```env
TRELLO_ACTION_URL=https://api.trello.com/1/actions/seu_id_do_trello
```

Você também pode utilizar diretamente as variáveis de ambiente do sistema operacional, por exemplo:

```powershell
$env:AUTOMATIONEXERCISE_EMAIL = 'seu_email'
$env:AUTOMATIONEXERCISE_PASSWORD = 'sua_senha'
$env:TRELLO_ACTION_ID = 'seu_id_do_trello'
```

Obs.: o projeto também aceita `TRELLO_ACTION_URL` diretamente, caso prefira passar a URL completa.

## Execução local

Executar a interface do Cypress:

```powershell
npm run cy:open
```

Executar em modo headless:

```powershell
npm run cy:run
```

Executar uma feature específica:

```powershell
npx cypress run --spec "cypress/e2e/features/api/trello.feature"
```

Executar a suíte de contrato do Trello:

```powershell
npx cypress run --spec "cypress/e2e/features/contract/trello_contrato.feature"
```

Executar com geração de relatório Allure:

```powershell
npm run test:allure
```

## Geração do relatório Allure

Gerar os resultados em HTML:

```powershell
npm run allure:report
```

Abrir o relatório localmente:

```powershell
npm run allure:open
```

Se preferir rodar o servidor manualmente:

```powershell
npx http-server ./allure-report -p 8080
```

Depois acesse:

```text
http://localhost:8080
```

## Estrutura do projeto

```text
cypress-bdd-teste-inmetrics/
├── .github/
│   └── workflows/
│       └── cypress.yml
├── config/
│   └── environment.ts
├── cypress/
│   ├── e2e/
│   │   ├── features/
│   │   │   ├── api/
│   │   │   ├── contract/
│   │   │   └── web/
│   ├── support/
│   │   ├── commands.ts
│   │   ├── contracts/
│   │   ├── elements/
│   │   ├── steps_back/
│   │   ├── steps_web/
│   │   └── e2e.ts
├── cypress.config.ts
├── package.json
├── .gitignore
├── README.md
└── node_modules/
```

## CI/CD

O projeto está configurado para executar na GitHub Actions via workflow em:

- `.github/workflows/cypress.yml`

A pipeline realiza:

- checkout do código
- instalação das dependências
- validação das secrets
- execução dos testes do Cypress
- geração do relatório Allure
- upload do relatório como artifact

## Observações

- a execução local usa `.env` para dados sensíveis
- a execução em pipeline usa secrets do GitHub Actions
- o relatório automatizado do Allure fica em `allure-results` e `allure-report`
- os artefatos de relatório podem ser vistos na aba de artifacts da execução da pipeline

## Dicas

- mantenha as variáveis sensíveis fora do código
- não faça commit do arquivo `.env`
- sempre gere o relatório após a execução para manter o histórico de execução
