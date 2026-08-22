# Cypress BDD

Projeto de testes end-to-end com Cypress, TypeScript e Cucumber.

## Instalação

```powershell
npm install
```

## Executar com interface

```powershell
npm run cy:open
```

## Executar em modo headless

```powershell
npm run cy:run
```

As features ficam em `cypress/e2e/features` e as step definitions usam o mesmo nome-base da feature.

## Configuração do ambiente

O apontamento padrão fica em `config/environment.ts`. Para executar contra outro ambiente, defina `CYPRESS_BASE_URL` antes de iniciar o Cypress:

```powershell
$env:CYPRESS_BASE_URL = 'https://seu-ambiente.example.com'
npm run cy:run
```
