describe('Blog app ', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('login form can be opened', function() {
    cy.contains('Log in').click()
  })

  it('user can login', function () {
    cy.contains('Log in').click()
    cy.get('#username').type('elias.vakkuri')
    cy.get('#password').type('salasana')
    cy.get('#login-button').click()
  })

  it('front page can be opened', function() {
    cy.contains('Cool Blog App')
    cy.contains('Log in')
  })
})