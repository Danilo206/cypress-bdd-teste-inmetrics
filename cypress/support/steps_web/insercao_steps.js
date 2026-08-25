import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import productsPage from '../pages/ProductsPage';
import productDetailsPage from '../pages/ProductDetailsPage';

When('clico no botão de view product', () => {
	productsPage.openProduct('Polo');
});

When('clico no botão Add to cart', () => {
	productDetailsPage.capturePrice();
	productDetailsPage.addToCart();
});

Then('o modal de produto adicionado ao carrinho deve ser exibido', () => {
	productDetailsPage.assertProductAdded();
});
