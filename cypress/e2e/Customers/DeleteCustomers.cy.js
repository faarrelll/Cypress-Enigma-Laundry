import { faker } from "@faker-js/faker";

import customerPage from "../../pages/customerPage";

import ALIAS from "../../constants/alias.constants";

describe("Delete Customer", () => {
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

    cy.interceptAddCustomer();
    customerPage.addCustomer(
      newCustomer.name,
      newCustomer.phoneNumber,
      newCustomer.address
    );
    cy.wait(`@${ALIAS.ADD_CUSTOMER}`).then((interception) => {
      customerId = interception?.response?.body?.data?.id;
    });
  });

  it("should delete a customer", () => {
    cy.interceptDeleteCustomer(customerId);
    customerPage.deleteCustomer(customerId);

    cy.wait(`@${ALIAS.DELETE_CUSTOMER}`).then(() => {
      customerPage.verifyCustomerDeleted(customerId);
    });
  });

  it("should persist the deleted customer after refresh", () => {
    cy.interceptDeleteCustomer(customerId);
    customerPage.deleteCustomer(customerId);

    cy.wait(`@${ALIAS.DELETE_CUSTOMER}`).then(() => {
      // Refresh the page and verify the customer is still deleted
      cy.reload(true);
      customerPage.verifyCustomerDeleted(customerId);
    });
  });

  it("should not delete a customer", () => {
    customerPage.getDeleteCustomerButton(customerId).click();
    customerPage.getDeleteCancelButton().click();

    // assert
    customerPage.verifyCustomerVisible(
      newCustomer.name,
      newCustomer.phoneNumber,
      newCustomer.address
    );

    // cleanup
    customerPage.deleteCustomer(customerId);
  });
});
