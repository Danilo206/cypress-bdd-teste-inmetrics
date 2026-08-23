import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import camposBuscaHome from '../elements/busca_home';

When('clico no item de Products do header da página', () => {
	cy.clickVisible(camposBuscaHome.productsHeaderLink);
});

When('insiro o nome do produto {string} no campo de pesquisa', (productName) => {
	cy.typeVisible(camposBuscaHome.searchProductInput, productName);
});

When('clico no botão de pesquisa', () => {
	cy.clickVisible(camposBuscaHome.searchProductButton);
});

Then('devo ser redirecionado para a página de produtos com os produtos selecionados', () => {
	cy.assertVisible(camposBuscaHome.productsItems);
	cy.assertVisible(camposBuscaHome.productsTitle);
	cy.assertVisible('.product-image-wrapper');
});

Then('devo ser redirecionado para a página de produtos sem exibir produtos', () => {
	cy.assertVisible(camposBuscaHome.productsItems);
	cy.assertVisible(camposBuscaHome.productsTitle);
	cy.assertNotExists('.product-image-wrapper');
});
