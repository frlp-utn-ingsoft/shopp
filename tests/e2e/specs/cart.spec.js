describe('Cart', () => {
    // Limpio la db antes de cada test
    beforeEach(() => {
        cy.task('seed');
    });

    it('Deberia iniciar vacio', () => {
        cy.visit('/cart');
        cy.get('.product').should('have.length', 0);
    });

    it('Deberia poder agregar un item al carrito', () => {
        cy.visit('/');

        cy.get('.product:first-child [type=submit]').click();
        cy.get('.product').should('have.length', 1);
        cy.get('.product .product__quantity').should(
            'contain.text',
            '1 en carrito'
        );

        cy.get('.navbar-brand').click();

        cy.get('.product:first-child [type=submit]').click();
        cy.get('.product').should('have.length', 1);
        cy.get('.product .product__quantity').should(
            'contain.text',
            '2 en carrito'
        );

        cy.get('.navbar-brand').click();

        cy.get('.product:nth-child(2) [type=submit]').click();
        cy.get('.product').should('have.length', 2);

        cy.get('.product:first-child .product__quantity').should(
            'contain.text',
            '2 en carrito'
        );

        cy.get('.product:nth-child(2) .product__quantity').should(
            'contain.text',
            '1 en carrito'
        );
    });
});
