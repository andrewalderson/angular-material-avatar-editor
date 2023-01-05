describe('angular-material-avatar-editor', () => {
  beforeEach(() => cy.visit('/iframe.html?id=profilepicturecomponent--primary'));
  it('should render the component', () => {
    cy.get('matx-profile-picture').should('exist');
  });
});