describe('angular-material-avatar-editor', () => {
  beforeEach(() => cy.visit('/iframe.html?id=profilepicturepickercomponent--primary'));
  it('should render the component', () => {
    cy.get('matx-profile-picture-picker').should('exist');
  });
});