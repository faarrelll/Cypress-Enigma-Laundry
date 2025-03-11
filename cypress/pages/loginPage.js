class LoginPage {
  visitBaseUrl() {
    cy.visit(`${Cypress.config().baseUrl}`);
  }
  visitLoginPage() {
    cy.visit(`${Cypress.config().baseUrl}/login`);
  }

  getLoginTitle() {
    return cy.get('[data-testid="login-title"]');
  }

  getUsernameInput() {
    return cy.get('[data-testid="username-input"]');
  }

  getPasswordInput() {
    return cy.get('[data-testid="password-input"]');
  }

  getLoginButton() {
    return cy.get('[data-testid="login-button"]');
  }

  login(username, password) {
    this.getUsernameInput().clear().type(username);
    this.getPasswordInput().clear().type(password);
    this.getLoginButton().click();
  }

  loginWithCorrectCredentials() {
    const username = "admin";
    const password = "password";

    cy.intercept("POST", "/api/v1/auth/login").as("postLogin");
    loginPage.login(username, password);
    cy.wait("@postLogin");
  }

  loginWithWrongCredentials() {
    const username = "abc123!@#";
    const password = "abc123!@#";

    cy.intercept("POST", "/api/v1/auth/login").as("postLogin");
    loginPage.login(username, password);
    cy.wait("@postLogin");
  }
}

const loginPage = new LoginPage();

export default loginPage;
