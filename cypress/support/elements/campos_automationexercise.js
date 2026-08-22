const camposAutomationExercise = {
	loginEmail: '[data-qa="login-email"]',
	loginPassword: '[data-qa="login-password"]',
	loginButton: '[data-qa="login-button"]',
	logoutLink: 'a[href="/logout"]',
	deleteAccountLink: 'a[href="/delete_account"]',
	userIcon: 'a:has(.fa.fa-user)',
	loginErrorMessage: 'p[style*="color: red"]',
	requiredLoginField: '[data-qa="login-email"]:invalid, [data-qa="login-password"]:invalid',
	poloBrandLink: '.brands-name a[href="/brand_products/Polo"]',
	productsItems: '.features_items',
	productsTitle: '.title.text-center',
	productsBreadcrumbs: '.breadcrumbs',
};

export default camposAutomationExercise;
