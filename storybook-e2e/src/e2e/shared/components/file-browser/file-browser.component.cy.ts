describe('angular-material-avatar-editor', () => {
  beforeEach(() => cy.visit('/iframe.html?id=filebrowsercomponent--primary'));
  it('should render the component', () => {
    cy.get('matx-file-browser').should('exist');
  });
});
