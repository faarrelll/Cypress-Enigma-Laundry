class CustomerPage {
  visit() {
    cy.visit(`${Cypress.config().baseUrl}/customers`);
  }

  getCustomerTitle() {
    return cy.get('[data-testid="customer-title"]');
  }

  getAddCustomerButton() {
    return cy.get('[data-testid="add-customer-button"]');
  }

  getCustomerModal() {
    return cy.get('[data-testid="customer-modal"]');
  }

  getCustomerModalCloseButton() {
    return cy.get('[data-testid="customer-modal-close-button"]');
  }

  getNameInput() {
    return cy.get('[data-testid="customer-modal-name-input"]');
  }

  getPhoneInput() {
    return cy.get('[data-testid="customer-modal-phone-input"]');
  }

  getAddressInput() {
    return cy.get('[data-testid="customer-modal-address-input"]');
  }

  getSubmitCustomerButton() {
    return cy.get('[data-testid="customer-modal-submit"]');
  }

  getEditCustomerButton(customerId) {
    return cy.get(`[data-testid="edit-customer-button-${customerId}"]`);
  }

  getDeleteCustomerButton(customerId) {
    return cy.get(`[data-testid="delete-customer-button-${customerId}"]`);
  }

  addCustomer(name, phoneNumber, address) {
    this.getAddCustomerButton().click();
    this.getCustomerModal().should("be.visible");

    this.getNameInput().clear().type(name);
    this.getPhoneInput().clear().type(phoneNumber);
    this.getAddressInput().clear().type(address);

    this.getSubmitCustomerButton().click();
    this.getCustomerModal().should("not.exist");
  }

  editCustomer(customerId, name, phoneNumber, address) {
    this.getEditCustomerButton(customerId).click();
    this.getCustomerModal().should("be.visible");

    this.getNameInput().clear().type(name);
    this.getPhoneInput().clear().type(phoneNumber);
    this.getAddressInput().clear().type(address);

    this.getSubmitCustomerButton().click();
    this.getCustomerModal().should("not.exist");
  }

  checkCustomerDetails(id, name, phoneNumber, address) {
    cy.contains(id.split("-")[0]).should("contain.text", id.split("-")[0]);
    cy.contains(name).should("contain.text", name);
    cy.contains(phoneNumber).should("contain.text", phoneNumber);
    cy.contains(address).should("contain.text", address);
  }

  verifyCustomerVisible(name, phoneNumber, address) {
    cy.contains(name).scrollIntoView().should("be.visible");
    cy.contains(phoneNumber).scrollIntoView().should("be.visible");
    cy.contains(address).scrollIntoView().should("be.visible");
  }

  getDeleteConfirmationButton() {
    return cy.get("[data-testid='confirm-delete-button'], .swal2-confirm");
  }

  getDeleteCancelButton() {
    return cy.get("[data-testid='cancel-delete-button'], .swal2-cancel");
  }

  deleteCustomer(customerId) {
    this.getDeleteCustomerButton(customerId).click();
    this.getDeleteConfirmationButton().click();
  }

  verifyCustomerDeleted(customerId) {
    this.getDeleteCustomerButton(customerId).should("not.exist");
  }
}

const customerPage = new CustomerPage();
export default customerPage;
