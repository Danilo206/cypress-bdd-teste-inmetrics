import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import camposBuscaHome from '../elements/busca_home';
import camposInsercaoProduto from '../elements/insercao_produto';

When('clico no botão de view product', () => {
	cy.get(camposBuscaHome.viewProductLink).first().scrollIntoView().should('be.visible').click();
});

When('clico no botão Add to cart', () => {
	cy.clickVisible(camposInsercaoProduto.addToCartButton);
});

Then('o modal de produto adicionado ao carrinho deve ser exibido', () => {
	cy.assertVisibleContains(camposInsercaoProduto.cartModal, 'Your product has been added to cart.');
	cy.assertVisible(camposInsercaoProduto.cartModalHeader);
	cy.assertVisible(camposInsercaoProduto.cartModalBody);
	cy.assertVisible(camposInsercaoProduto.cartModalFooter);
	cy.assertVisible(camposInsercaoProduto.cartModalText);
});
