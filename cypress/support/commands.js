import ALIAS from "../constants/alias.constants";
import loginPage from "../pages/loginPage";

Cypress.Commands.addAll({
  interceptAddCustomer() {
    cy.intercept("POST", "**/customers/").as(ALIAS.ADD_CUSTOMER);
  },
  interceptDeleteCustomer(customerId) {
    cy.intercept("DELETE", `**/customers/${customerId}`).as(
      ALIAS.DELETE_CUSTOMER
    );
  },
  interceptAddProduct() {
    cy.intercept("POST", "**/products/").as(ALIAS.ADD_PRODUCT);
  },
  interceptDeleteProduct(productId) {
    cy.intercept("DELETE", `**/products/${productId}`).as(ALIAS.DELETE_PRODUCT);
  },
  interceptEditProduct(productId) {
    cy.intercept("PUT", "**/products/").as(ALIAS.EDIT_PRODUCT);
  },
  interceptGetAllProducts() {
    cy.intercept("GET", "**/products/").as(ALIAS.GET_ALL_PRODUCTS);
  },
  loginViaUi() {
    cy.session("loginWithCorrectCredentials", () => {
      loginPage.visitLoginPage();
      loginPage.loginWithCorrectCredentials();
    });
  },
});
