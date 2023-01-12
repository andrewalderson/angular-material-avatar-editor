describe('angular-material-avatar-editor', () => {
  beforeEach(() => cy.visit('/iframe.html?id=croppercanvascomponent--primary'));
  it('should render the component', () => {
    cy.get('matx-cropper-canvas').should('exist');
  });
});