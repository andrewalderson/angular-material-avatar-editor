describe('angular-material-avatar-editor', () => {
  beforeEach(() => cy.visit('/iframe.html?id=profilepicturedialog--primary'));
  it('should render the component', () => {
    cy.get('button[matx-profile-picture-dialog-trigger]')
      .click()
      .get('matx-profile-picture-dialog')
      .should('exist');
  });
});
