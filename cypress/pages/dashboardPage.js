class DashboardPage {
  visit() {
    cy.visit(`${Cypress.config().baseUrl}/`);
  }
}

const dashboardPage = new DashboardPage();
export default dashboardPage;
