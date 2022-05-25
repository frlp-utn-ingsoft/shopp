describe('Home Test', () => {
    // Limpio la db antes de cada test
    beforeEach(() => {
        cy.task('seed');
    });

    it('Deberia tener de titulo Shoop', () => {
        cy.visit('/');
        cy.title().should('eq', 'Shopp');
    });

    it('Deberia mostrar 10 productos', () => {
        cy.visit('/');

        cy.get('.product').should('have.length', 12);
    });

    it('El primer producto deberia ser "Placard"', () => {
        cy.visit('/');

        cy.get('.product:first-child .card-title').should(
            'have.text',
            'Placard'
        );
    });
});
