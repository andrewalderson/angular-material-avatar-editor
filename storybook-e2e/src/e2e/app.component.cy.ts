describe('angular-material-avatar-editor', () => {
  beforeEach(() => cy.visit('/iframe.html?id=appcomponent--primary'));
  it('should render the component', () => {
    cy.get('matx-root').should('exist');
  });
});