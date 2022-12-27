describe('angular-material-avatar-editor', () => {
  describe('default icon state', () => {
    beforeEach(() => cy.visit('/iframe.html?id=avatarcomponent--default'));
    it('should render the component', () => {
      cy.get('matx-avatar').should('exist');
    });
  });
  describe('initials state', () => {
    beforeEach(() =>
      cy.visit('/iframe.html?id=avatarcomponent--with-initials')
    );
    it('should render the component', () => {
      cy.get('matx-avatar').should('exist');
    });
  });
});
