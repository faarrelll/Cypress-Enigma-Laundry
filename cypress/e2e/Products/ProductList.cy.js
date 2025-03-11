import productPage from "../../pages/productPage";
import ALIAS from "../../constants/alias.constants";

describe("Product List", () => {
  beforeEach(() => {
    cy.loginViaUi();
    cy.interceptGetAllProducts();
    productPage.visit();
    cy.wait(`@${ALIAS.GET_ALL_PRODUCTS}`);
  });

  it("should display the Product page title", () => {
    productPage.getProductTitle().should("include.text", "Product");
  });

  it("should display the correct columns in the product table", () => {
    cy.get("thead th").should("have.length", 5);
    cy.get("thead th").eq(0).should("contain", "ID");
    cy.get("thead th").eq(1).should("contain", "Name");
    cy.get("thead th").eq(2).should("contain", "Price");
    cy.get("thead th").eq(3).should("contain", "Type");
    cy.get("thead th").eq(4).should("contain", "Action");
  });

  it("should display product details correctly", () => {
    cy.get("tbody tr")
      .first()
      .within(() => {
        cy.get("td").should("have.length", 5);
        cy.get("td").eq(0).should("not.be.empty");
        cy.get("td").eq(1).should("not.be.empty");
        cy.get("td").eq(2).should("not.be.empty");
        cy.get("td").eq(3).should("not.be.empty");
        cy.get("td").eq(4).find("button").should("have.length", 2);
      });
  });

  it("should have functioning edit and delete buttons for each product", () => {
    cy.get("tbody tr")
      .first()
      .within(() => {
        cy.get('button[data-testid^="edit-product-button-"]').should("exist");
        cy.get('button[data-testid^="delete-product-button-"]').should("exist");
      });
  });

  it("should open add product modal when clicking 'Add Product' button", () => {
    productPage.getAddProductButton().click();
    productPage.getProductModal().should("be.visible");
  });

  it("should update product list after adding a new product", () => {
    const newProduct = {
      name: "New Test Product",
      price: "100",
      type: "Test Type",
    };

    cy.interceptAddProduct();
    cy.interceptGetAllProducts();

    productPage.addProduct(newProduct.name, newProduct.price, newProduct.type);

    cy.wait(`@${ALIAS.ADD_PRODUCT}`);
    cy.wait(`@${ALIAS.GET_ALL_PRODUCTS}`);

    productPage.verifyProductVisible(
      newProduct.name,
      newProduct.price,
      newProduct.type
    );
  });
});
