import customerPage from "../../pages/customerPage";

describe("Customer List", () => {
  beforeEach(() => {
    cy.loginViaUi();

    customerPage.visit();
  });

  it("should display the Customer page title", () => {
    customerPage.getCustomerTitle().should("include.text", "Customer"); // use include as it can be also with plural like Customers
  });

  it("should display the correct first row of customer details", () => {
    const id = "cbead6e9";
    const name = "Yanto Subidi";
    const phoneNumber = "828292992";
    const address = "Jakarta Selatan";

    customerPage.checkCustomerDetails(id, name, phoneNumber, address);
  });

  it("should display the correct second row of customer details", () => {
    const id = "b32eed7d";
    const name = "Ana Maryani";
    const phoneNumber = "7398291200";
    const address = "Jakarta Barat";

    customerPage.checkCustomerDetails(id, name, phoneNumber, address);
  });
});
