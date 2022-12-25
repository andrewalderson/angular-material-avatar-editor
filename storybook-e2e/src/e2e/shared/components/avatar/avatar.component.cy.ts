describe('angular-material-avatar-editor', () => {
  beforeEach(() => cy.visit('/iframe.html?id=avatarcomponent--default'));
  it('should render the component', () => {
    cy.get('matx-avatar').should('exist');
  });
});
