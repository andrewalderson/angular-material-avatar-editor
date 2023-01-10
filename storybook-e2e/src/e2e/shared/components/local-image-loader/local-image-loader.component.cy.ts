describe('angular-material-avatar-editor', () => {
  beforeEach(() => cy.visit('/iframe.html?id=localimageloadercomponent--primary'));
  it('should render the component', () => {
    cy.get('matx-local-image-loader').should('exist');
  });
});