import loginPage from "../../pages/loginPage";

describe("Login Page", () => {
  before(() => {
    Cypress.session.clearAllSavedSessions();
  });

  beforeEach(() => {
    loginPage.visitBaseUrl();
  });

  it("should redirect to login page when visiting base URL", () => {
    cy.url().should("include", "/login");
  });

  it("should display login page title", () => {
    loginPage.getLoginTitle().should("have.text", "Login");
  });

  it("should stay on login page with incorrect credentials", () => {
    loginPage.loginWithWrongCredentials();

    cy.url().should("include", "/login");
  });

  it("should allow user to login with valid credentials", () => {
    loginPage.loginWithCorrectCredentials();

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});
