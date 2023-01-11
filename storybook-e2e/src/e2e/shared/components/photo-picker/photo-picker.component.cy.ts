describe('angular-material-avatar-editor', () => {
  beforeEach(() => cy.visit('/iframe.html?id=photopickercomponent--primary'));
  it('should render the component', () => {
    cy.get('matx-photo-picker').should('exist');
  });
});
