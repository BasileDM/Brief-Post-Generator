describe('App Navigation', () => {
  it('clicks on previous and next, checks AI response', () => {
    cy.intercept('POST', '/api/yourAiEndpoint', {
      statusCode: 200,
      body: {
        examples: [
          { Title: 'Test 1', Slogan: 'Slogan 1' },
          { Title: 'Test 2', Slogan: 'Slogan 2' },
        ],
      },
    }).as('mockAi');

    cy.visit('/');

    cy.wait('@mockAi').then((interception) => {
      // Confirm the response has the right number of items
      expect(interception.response.body.examples).to.have.length(2);
    });

    cy.get('#previous').click();
    cy.get('#next').click();

    cy.get('#previous').should('not.be.disabled');
    cy.get('#next').should('not.be.disabled');
  });
});
