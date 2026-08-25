import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import productsPage from '../pages/ProductsPage';

When('clico em um item do menu produtos na lateral esquerda da página', () => {
	productsPage.openFromSidebar();
});

When('clico no item de Products do header da página', () => {
	productsPage.openFromHeader();
});

When('insiro o nome do produto {string} no campo de pesquisa', (productName) => {
	productsPage.fillSearch(productName);
});

When('clico no botão de pesquisa', () => {
	productsPage.search();
});

Then('devo ser redirecionado para a página de produtos com os produtos selecionados', () => {
	productsPage.assertProductsDisplayed();
});

Then('devo ser redirecionado para a página de produtos sem exibir produtos', () => {
	productsPage.assertNoProductsDisplayed();
});
