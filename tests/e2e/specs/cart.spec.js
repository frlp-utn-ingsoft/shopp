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

    it('Deberia mostrar 2 productos con descuento en la pagina de descuento', () => {
        cy.visit('/discount');
        cy.get('.product').should('have.length', 2)
        cy.get('.product:nth-child(1) [data-testid="discount"]')
            .should('have.text', '5 %')

        cy.get('.product:nth-child(2) [data-testid="discount"]')
            .should('have.text', '10 %')
    });

    it('Deberia mostrar un mensaje si el carrito no contiene ningín Item', () => {
        cy.visit('/cart');

        cy.get('h2').should(
            'contain.text',
            'No posee productos en el carrito'
        );
    });

    it('Debería contener el footer', () => {
        cy.visit('/cart');
        cy.get('footer').should(
            'contain.text',
            'shopp@gmail.com'
        );
    });

});
