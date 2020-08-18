

context('visitar home y revisar si tiene: ', () => {
  it('sala', () => {
    cy.visit('/');
    cy.contains('SALA');
  });

  it('click para login', () => {
    cy.visit('/');
    cy.get('input#input-login').type('testing');
    cy.get('button.rnx-button')
      .click();
  });

  it('el chat esta abierto', () => {
    cy.visit('/');
    cy.get('input#rnx-input-write-message');
    cy.get('button#rnx-button-send-message');
  });

  it('el chat esta funcionando como anónimo', () => {
    cy.visit('/');
    cy.get('input#rnx-input-write-message').type('cypress test chat');
    cy.get('button#rnx-button-send-message')
      .click();
    cy.wait(3000);
    cy.contains('cypress test chat');
  });
});
