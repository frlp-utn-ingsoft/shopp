describe('Home Test', () => {
    // Limpio la db antes de cada test
    beforeEach(() => {
        cy.task('seed');
    });

    it('Deberia tener de titulo Shopp', () => {
        cy.visit('/');
        cy.title().should('eq', 'Shopp');
    });

    it('Deberia mostrar 10 productos', () => {
        cy.visit('/');

        cy.get('.product').should('have.length', 10);
    });

    it('El primer producto deberia ser "Placard"', () => {
        cy.visit('/');

        cy.get('.product:first-child .card-title').should(
            'have.text',
            'Placard'
        );
    });

    it('Deberia mostrarse el páginador si es necesario', () => {
        cy.visit('/');

        cy.get('.pagination').should('be.visible')
    });

    it('Deberia poder paginar', () => {
        cy.visit('/');

        cy.get('.pagination__next').click()
        cy.get('.product').should('have.length', 2);
    });

    it('Deberia mostrar el primer producto con descuento', () => {
        cy.visit('/');

        cy.get(':nth-child(1) > .card-body > .ms-3 > [data-testid="discount"]')
            .should('contain.text', '5 %');
    });

    it('Debería contener el footer', () => {
        cy.visit('/home');
        cy.get('footer').should(
            'contain.text',
            'shopp@gmail.com'
        );
    });

});
