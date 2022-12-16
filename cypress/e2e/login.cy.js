describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });
  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('.btn-login').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]').type('testuser@gmail.com');
    cy.get('.btn-login').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email or password are wrong', () => {
    cy.get('input[placeholder="Email"]').type('testuser@gmail.com');
    cy.get('input[placeholder="Password"]').type('wrong_password');
    cy.get('.btn-login').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage and add thread button when email or password are correct', () => {
    cy.get('input[placeholder="Email"]').type('asd@gmail.com');
    cy.get('input[placeholder="Password"]').type('asdasd');
    cy.get('.btn-login').click();
    cy.get('button').contains('Logout').should('be.visible');
    cy.get('.add-thread').should('be.visible');
  });

});
