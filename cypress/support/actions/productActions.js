import productsPage from '../pages/ProductsPage';
import productDetailsPage from '../pages/ProductDetailsPage';

export const searchProduct = (productName) => {
	productsPage.openFromHeader();
	productsPage.fillSearch(productName);
	productsPage.search();
};

export const selectProduct = (productName) => {
	productsPage.openProduct(productName);
};

export const addCurrentProductToCart = () => {
	productDetailsPage.capturePrice();
	productDetailsPage.addToCart();
};
