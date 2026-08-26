import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import productDetailsPage from '../pages/ProductDetailsPage';
import { addCurrentProductToCart, selectProduct } from '../actions/productActions';

When('seleciono o produto {string} e adiciono ao carrinho', (productName) => {
	selectProduct(productName);
	addCurrentProductToCart();
});

Then('o modal de produto adicionado ao carrinho deve ser exibido', () => {
	productDetailsPage.assertProductAdded();
});
