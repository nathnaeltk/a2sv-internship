describe('Bookmark Functionality', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
  });

  it('should redirect to login when trying to bookmark while not authenticated', () => {
    // Click the bookmark button on the first job card
    cy.get('.job-card').first().find('button').click();
    
    // Should redirect to login page
    cy.url().should('include', '/login');
  });

  it('should allow bookmarking after login', () => {
    // Login first
    cy.visit('/login');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    // Wait for redirect to home page
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    
    // Click the bookmark button on the first job card
    cy.get('.job-card').first().find('button').click();
    
    // Verify the bookmark icon changes to solid
    cy.get('.job-card').first().find('button svg').should('have.class', 'text-blue-600');
    
    // Click again to remove bookmark
    cy.get('.job-card').first().find('button').click();
    
    // Verify the bookmark icon changes back to outline
    cy.get('.job-card').first().find('button svg').should('have.class', 'text-gray-600');
  });

  it('should persist bookmarks after page refresh', () => {
    // Login first
    cy.visit('/login');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    // Wait for redirect to home page
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    
    // Bookmark the first job
    cy.get('.job-card').first().find('button').click();
    
    // Refresh the page
    cy.reload();
    
    // Verify the bookmark is still present
    cy.get('.job-card').first().find('button svg').should('have.class', 'text-blue-600');
  });

  it('should show loading state while bookmarking', () => {
    // Login first
    cy.visit('/login');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    // Wait for redirect to home page
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    
    // Click the bookmark button
    cy.get('.job-card').first().find('button').click();
    
    // Verify loading state
    cy.get('.job-card').first().find('button').should('be.disabled');
    
    // Wait for loading to complete
    cy.get('.job-card').first().find('button').should('not.be.disabled');
  });

  it('should handle bookmark errors gracefully', () => {
    // Login first
    cy.visit('/login');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    // Wait for redirect to home page
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    
    // Simulate network error
    cy.intercept('POST', '**/bookmarks/*', {
      statusCode: 500,
      body: { message: 'Internal server error' }
    });
    
    // Click the bookmark button
    cy.get('.job-card').first().find('button').click();
    
    // Verify error handling (you might want to add a toast notification or error message)
    cy.get('.job-card').first().find('button').should('not.be.disabled');
  });
}); 