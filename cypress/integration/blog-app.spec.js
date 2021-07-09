describe('Blog app ', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('before logging in', function () {

    it('front page can be opened', function () {
      cy.contains('Cool Blog App')
      cy.contains('Log in')
    })

    it('login form can be opened', function () {
      cy.contains('Log in').click()
    })

    it('login fails with wrong password', function () {
      cy.contains('Log in').click()
      cy.get('#username').type('test')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(0, 0, 0)')

      cy.get('html').should('not.contain', 'test logged in')
    })

    it('valid user can login', function () {
      cy.contains('Log in').click()
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
    })

    after(function () {
      cy.clearLocalStorage()
      cy.reload()
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test', password: 'test' })
    })

    it('a new blog entry can be created', function () {
      cy.contains('Add new blog').click()
      cy.get('#input-title').type('Test blog title')
      cy.get('#input-author').type('Test Author')
      cy.get('#input-url').type('testurl')
      cy.get('#submit-blog-form').click()
      cy.contains('Test blog title')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        const blog = {
          title: 'Test blog title',
          author: 'Test Author',
          url: 'testurl'
        }

        cy.createBlog(blog)
      })

      it('likes can be added to a blog', function () {
        cy.contains('Show more').click()
        cy.contains('Likes: 0')
        cy.contains('Like').click().click()
        cy.contains('Likes: 2')
      })
    })
  })
})