class ProductPage {
  visit() {
    cy.visit(`${Cypress.config().baseUrl}/products`);
  }

  getProductTitle() {
    return cy.get('[data-testid="product-title"]');
  }

  getAddProductButton() {
    return cy.get('[data-testid="add-product-button"]');
  }

  getProductModal() {
    return cy.get('[data-testid="add-product-modal"]');
  }

  getProductModalCloseButton() {
    return cy.get('[data-testid="close-add-product-modal"]');
  }

  getNameInput() {
    return cy.get('[data-testid="product-name-input"]');
  }

  getPriceInput() {
    return cy.get('[data-testid="product-price-input"]');
  }

  getTypeInput() {
    return cy.get('[data-testid="product-type-input"]');
  }

  getSubmitProductButton() {
    return cy.get('[data-testid="submit-add-product"]');
  }

  getDeleteProductButton(productId) {
    return cy.get(`[data-testid="delete-product-button-${productId}"]`);
  }

  getDeleteConfirmationButton() {
    return cy.get("[data-testid='confirm-delete-button'], .swal2-confirm");
  }

  addProduct(name, price, type) {
    this.getAddProductButton().click();
    this.getProductModal().should("be.visible");

    this.getNameInput().clear().type(name);
    this.getPriceInput().clear().type(price);
    this.getTypeInput().clear().type(type);

    this.getSubmitProductButton().click();
    this.getProductModal().should("not.exist");
  }

  verifyProductVisible(name, price, type) {
    cy.contains(name).scrollIntoView().should("be.visible");
    cy.contains(Math.floor(price)).scrollIntoView().should("be.visible");
    cy.contains(type).scrollIntoView().should("be.visible");
  }

  getDeleteProductButton(productId) {
    return cy.get(`[data-testid="delete-product-button-${productId}"]`);
  }

  deleteProduct(productId) {
    this.getDeleteProductButton(productId).scrollIntoView();
    this.getDeleteProductButton(productId).should("be.visible").click();
    this.getDeleteConfirmationButton().click();
  }

  verifyProductDeleted(productId) {
    this.getDeleteProductButton(productId).should("not.exist");
  }

  getEditProductButton(productId) {
    return cy.get(`[data-testid="edit-product-button-${productId}"]`);
  }

  editProduct(productId, name, price, type) {
    this.getEditProductButton(productId).click();
    this.getProductModal().should("be.visible");

    this.getNameInput().clear().type(name);
    this.getPriceInput().clear().type(price);
    this.getTypeInput().clear().type(type);

    this.getSubmitProductButton().click();
    this.getProductModal().should("not.exist");
  }
}

const productPage = new ProductPage();
export default productPage;
