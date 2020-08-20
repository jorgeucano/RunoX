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
    // aquí una AYUDA
    // el id del botón es 'rnx-chat-bubble-delete_{{ message.id}}' pero he ahí la cuestión: ¿cómo buscar ese id? ¯\_( ͡◡ ͜ʖ ͡◡)_/¯
    cy.get(`button#delete-${date}`)
      .click();
    cy.wait(3000);
    cy.should('not.exist').contains(date);
  });
});
