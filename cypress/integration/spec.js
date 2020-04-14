describe('Sapper template app', () => {
	beforeEach(() => {
		cy.visit('/')
	});

	it('has the correct <h1>', () => {
		cy.contains('h1', 'Great success!')
	});

	/*it('navigates to /about', () => {
		cy.get('a').contains('about').click();
		cy.url().should('include', '/about');
	});

	it('navigates to /reviews', () => {
		cy.get('a').contains('reviews').click();
		cy.url().should('include', '/reviews');
	});*/
});