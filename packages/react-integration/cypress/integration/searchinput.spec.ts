describe('Search Input Demo Test', () => {
  it('Navigate to demo section', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#search-input-demo-nav-item-link').click();
    cy.url().should('eq', 'http://localhost:3000/search-input-demo-nav-link');
  });

  it('Verify search input ref by clicking focus button', () => {
    cy.get('#focus_button')
      .first()
      .click();
    cy.focused().should('have.attr', 'placeholder', 'Find by name');
    cy.focused().blur();
  });

  it('Verify search input and its handlers work', () => {
    cy.get('.pf-c-search-input__count').should('not.exist');
    cy.get('.pf-c-search-input__clear').should('not.exist');
    cy.get('.pf-c-search-input__nav').should('not.exist');

    cy.get('.pf-c-search-input__text-input').type('Hello world');
    cy.get('.pf-c-search-input__text-input').should('have.value', 'Hello world');

    cy.get('.pf-c-search-input__count').should('be.visible');
    cy.get('.pf-c-search-input__clear').should('be.visible');
    cy.get('.pf-c-search-input__nav').should('be.visible');

    cy.get('.pf-c-badge').should('have.text', '1 / 3');
    cy.get('.pf-c-search-input__nav button')
      .last()
      .click();
    cy.get('.pf-c-badge').should('have.text', '2 / 3');
    cy.get('.pf-c-search-input__nav button')
      .first()
      .click();
    cy.get('.pf-c-badge').should('have.text', '1 / 3');

    cy.get('.pf-c-search-input__clear').click();
    cy.get('.pf-c-search-input__text-input').should('not.have.value', 'Hello world');

    cy.get('.pf-c-search-input__count').should('not.exist');
    cy.get('.pf-c-search-input__clear').should('not.exist');
    cy.get('.pf-c-search-input__nav').should('not.exist');
  });

  it('Verify advanced search and its handlers work', () => {
    cy.get('.pf-c-search-input__menu').should('not.exist');
    cy.get('.pf-c-search-input button')
      .eq(0)
      .click();
    cy.get('.pf-c-search-input__menu').should('be.visible');

    cy.get('.pf-c-search-input__menu input')
      .eq(0)
      .type('test');
    cy.get('.pf-c-search-input__text-input').should('have.value', 'username:test');

    cy.get('.pf-c-search-input__text-input').type(' firstname:hi another test');
    cy.get('.pf-c-search-input__menu input')
      .eq(1)
      .should('have.value', 'hi');
    cy.get('.pf-c-search-input__menu input')
      .eq(2)
      .should('have.value', 'another test');

    cy.get('.pf-c-form__actions button')
      .eq(1)
      .click();
    cy.get('.pf-c-search-input__text-input').should('have.value', '');
    cy.get('.pf-c-search-input__menu input')
      .eq(1)
      .should('have.value', '');
    cy.get('.pf-c-search-input__menu input')
      .eq(2)
      .should('have.value', '');

    cy.get('.pf-c-search-input__menu input')
      .eq(0)
      .type('test');
    cy.get('.pf-c-form__actions button')
      .eq(0)
      .click();
    cy.get('.pf-c-search-input__menu').should('not.be.visible');
    cy.get('.pf-c-search-input__text-input').should('have.value', 'username:test');
  });
});
