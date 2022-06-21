describe('Cart', () => {
    // Limpio la db antes de cada test
    beforeEach(() => {
        cy.task('seed');
    });

    it('Deberia iniciar vacio', () => {
        cy.visit('/cart');
        cy.get('.product').should('have.length', 0);
    });

    it('Deberia estar vacio y mostrar mensaje vacio', () => {
        cy.visit('/cart');
        cy.contains('No posee productos en el carrito');
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

        cy.get('.product:nth-child(2) .product__quantity').should(
            'contain.text',
            '2 en carrito'
        );

        cy.get('.product:first-child .product__quantity').should(
            'contain.text',
            '1 en carrito'
        );
    });

    it('Deberia mostrar 2 productos con descuento en la pagina de descuento', () => {
        cy.visit('/discount');
        cy.get('.product').should('have.length', 2);
        cy.get('.product:nth-child(1) [data-testid="discount"]').should(
            'have.text',
            '5 %'
        );

        cy.get('.product:nth-child(2) [data-testid="discount"]').should(
            'have.text',
            '10 %'
        );
    });
});
