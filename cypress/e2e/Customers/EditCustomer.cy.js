import { faker } from "@faker-js/faker";
import customerPage from "../../pages/customerPage";
import ALIAS from "../../constants/alias.constants";

describe("Edit Customer", () => {
  let customerId;
  let newCustomer;
  let editedCustomer;

  beforeEach(() => {
    newCustomer = {
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      address: `${faker.location.city()}, ${faker.location.country()}`,
    };
    editedCustomer = {
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

  afterEach(() => {
    if (customerId) {
      cy.interceptDeleteCustomer(customerId);
      customerPage.deleteCustomer(customerId);
      cy.wait(`@${ALIAS.DELETE_CUSTOMER}`);
    }
  });

  it("should edit a customer", () => {
    customerPage.editCustomer(
      customerId,
      editedCustomer.name,
      editedCustomer.phoneNumber,
      editedCustomer.address
    );

    customerPage.checkCustomerDetails(
      customerId,
      editedCustomer.name,
      editedCustomer.phoneNumber,
      editedCustomer.address
    );
  });

  it("should persist the edited customer after reload", () => {
    customerPage.editCustomer(
      customerId,
      editedCustomer.name,
      editedCustomer.phoneNumber,
      editedCustomer.address
    );

    customerPage.checkCustomerDetails(
      customerId,
      editedCustomer.name,
      editedCustomer.phoneNumber,
      editedCustomer.address
    );

    cy.reload(true);
    customerPage.checkCustomerDetails(
      customerId,
      editedCustomer.name,
      editedCustomer.phoneNumber,
      editedCustomer.address
    );
  });

  it("should close modal (modal is no longer visible) when modal close button is clicked", () => {
    customerPage.getEditCustomerButton(customerId).click();
    customerPage.getCustomerModal().should("be.visible");
    customerPage.getCustomerModalCloseButton().click();
    customerPage.getCustomerModal().should("not.exist");
  });
});
