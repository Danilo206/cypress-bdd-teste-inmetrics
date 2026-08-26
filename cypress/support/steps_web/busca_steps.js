import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import productsPage from '../pages/ProductsPage';
import { searchProduct } from '../actions/productActions';

When('clico em um item do menu produtos na lateral esquerda da página', () => {
	productsPage.openFromSidebar();
});

When('busco pelo produto {string}', (productName) => {
	searchProduct(productName);
});

Then('devo ser redirecionado para a página de produtos com os produtos selecionados', () => {
	productsPage.assertProductsDisplayed();
});

Then('devo ser redirecionado para a página de produtos sem exibir produtos', () => {
	productsPage.assertNoProductsDisplayed();
});
