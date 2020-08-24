context('visitar home y revisar si tiene: ', () => {

  const date = (new Date()).toString();

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

  it('cerrar el chat', () => {
    cy.visit('/');
    cy.get('button#rnx-button-close-message')
      .click();
    cy.wait(1000);
    cy.get('button.rnx-button')
      .contains('Chat')
      .should('exist');

  });

  it('abrir el chat', () => {
    cy.get('button.rnx-button').contains('Chat').click();
    cy.get('button#rnx-button-close-message').should('exist');
  });

  it('el chat esta abierto', () => {
    cy.visit('/');
    cy.get('input#rnx-input-write-message');
    cy.get('button#rnx-button-send-message');
  });

  it('el chat esta funcionando como anónimo', () => {
    cy.visit('/');
    cy.get('input#rnx-input-write-message').type(date);
    cy.get('button#rnx-button-send-message')
      .click();
    cy.wait(3000);
    cy.contains(date);
  });

  it('chequea la funcion de eliminar un mensaje del chat', () => {
    cy.visit('/');
    const div = cy.get('div.rnx-chat-bubble-message')
      .contains(date)
      .parent();
    const button = div
      .children('.rnx-chat-bubble-timestamp')
      .children('button');
    button
      .click({force: true});
    cy.wait(3000);
    cy.get('div.rnx-chat-bubble-message')
      .contains(date)
      .should('not.exist');
  });
});
