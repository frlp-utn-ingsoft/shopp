describe('Cart', () => {
    // Limpio la db antes de cada test
    beforeEach(() => {
        cy.task('seed');
    });

    it('Deberia mostrar 2 productos con descuento en la pagina de descuento', () => {
        cy.visit('/discount');
        cy.get('.product').should('have.length', 2)
        cy.get('.product:nth-child(1) [data-testid="discount"]')
            .should('have.text', '5 %')

        cy.get('.product:nth-child(2) [data-testid="discount"]')
            .should('have.text', '10 %')
    });
});
