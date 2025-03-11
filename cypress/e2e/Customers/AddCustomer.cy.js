import { faker } from "@faker-js/faker";

import customerPage from "../../pages/customerPage";

import ALIAS from "../../constants/alias.constants";

describe("Add Customer", () => {
  let customerId;
  let newCustomer;

  beforeEach(() => {
    newCustomer = {
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      address: `${faker.location.city()}, ${faker.location.country()}`,
    };

    cy.loginViaUi();
    customerPage.visit();
  });

  afterEach(() => {
    if (customerId) {
      cy.interceptDeleteCustomer(customerId);
      customerPage.deleteCustomer(customerId);
      cy.wait(`@${ALIAS.DELETE_CUSTOMER}`);
      customerId = null;
    }
  });

  it("should add a new customer", () => {
    cy.interceptAddCustomer();

    customerPage.addCustomer(
      newCustomer.name,
      newCustomer.phoneNumber,
      newCustomer.address
    );

    cy.wait(`@${ALIAS.ADD_CUSTOMER}`).then((interception) => {
      customerId = interception?.response?.body?.data?.id;

      customerPage.verifyCustomerVisible(
        newCustomer.name,
        newCustomer.phoneNumber,
        newCustomer.address
      );
    });
  });

  it("should persist the new customer after reload", () => {
    cy.interceptAddCustomer();

    customerPage.addCustomer(
      newCustomer.name,
      newCustomer.phoneNumber,
      newCustomer.address
    );

    cy.wait(`@${ALIAS.ADD_CUSTOMER}`).then((interception) => {
      customerId = interception?.response?.body?.data?.id;

      customerPage.verifyCustomerVisible(
        newCustomer.name,
        newCustomer.phoneNumber,
        newCustomer.address
      );
    });

    cy.reload(true);
    customerPage.verifyCustomerVisible(
      newCustomer.name,
      newCustomer.phoneNumber,
      newCustomer.address
    );
  });

  it("should not close modal when fields are empty", () => {
    customerPage.getAddCustomerButton().click();
    customerPage.getSubmitCustomerButton().click();
    customerPage.getCustomerModal().should("be.visible");
  });

  it("should close modal (modal is no longer visible) when modal close button is clicked", () => {
    customerPage.getAddCustomerButton().click();
    customerPage.getCustomerModal().should("be.visible");
    customerPage.getCustomerModalCloseButton().click();
    customerPage.getCustomerModal().should("not.exist");
  });
});
