import { faker } from "@faker-js/faker";
import productPage from "../../pages/productPage";
import ALIAS from "../../constants/alias.constants";

describe("Add Product", () => {
  let productId;
  let newProduct;

  beforeEach(() => {
    newProduct = {
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      type: faker.commerce.department(),
    };

    cy.loginViaUi();
    productPage.visit();
  });

  // afterEach(() => {
  //   try {
  //     if (productId) {
  //       cy.interceptDeleteProduct(productId);
  //       productPage.deleteProduct(productId.split("-")[0]);
  //       cy.wait(`@${ALIAS.DELETE_PRODUCT}`);
  //       productId = null;
  //     }
  //   } catch (error) {
  //     console.log("error aftereach", error);
  //   }
  // });

  it("should add a new product", () => {
    cy.interceptAddProduct();

    productPage.addProduct(newProduct.name, newProduct.price, newProduct.type);

    cy.wait(`@${ALIAS.ADD_PRODUCT}`).then((interception) => {
      productId = interception?.response?.body?.data?.id;

      productPage.verifyProductVisible(
        newProduct.name,
        newProduct.price,
        newProduct.type
      );
    });
  });

  it("should persist the new product after reload", () => {
    cy.interceptAddProduct();

    productPage.addProduct(newProduct.name, newProduct.price, newProduct.type);

    cy.wait(`@${ALIAS.ADD_PRODUCT}`).then((interception) => {
      productId = interception?.response?.body?.data?.id;

      productPage.verifyProductVisible(
        newProduct.name,
        newProduct.price,
        newProduct.type
      );
    });

    cy.reload(true);
    productPage.verifyProductVisible(
      newProduct.name,
      newProduct.price,
      newProduct.type
    );
  });

  it("should not close modal when fields are empty", () => {
    productPage.getAddProductButton().click();
    productPage.getSubmitProductButton().click();
    productPage.getProductModal().should("be.visible");
  });

  it("should close modal when modal close button is clicked", () => {
    productPage.getAddProductButton().click();
    productPage.getProductModal().should("be.visible");
    productPage.getProductModalCloseButton().click();
    productPage.getProductModal().should("not.exist");
  });

  it("should show validation errors for invalid inputs", () => {
    productPage.getAddProductButton().click();
    productPage.getSubmitProductButton().click();
    cy.get('[data-testid="name-error"]').should("be.visible");
    cy.get('[data-testid="price-error"]').should("be.visible");
    cy.get('[data-testid="type-error"]').should("be.visible");
  });

  it("should successfully add a product with minimum valid inputs", () => {
    cy.interceptAddProduct();

    const minProduct = {
      name: "A",
      price: "1",
      type: "X",
    };

    productPage.addProduct(minProduct.name, minProduct.price, minProduct.type);

    cy.wait(`@${ALIAS.ADD_PRODUCT}`).then((interception) => {
      productId = interception?.response?.body?.data?.id;

      productPage.verifyProductVisible(
        minProduct.name,
        minProduct.price,
        minProduct.type
      );
    });
  });

  it("should handle adding a product with a very long name", () => {
    cy.interceptAddProduct();

    const longNameProduct = {
      name: faker.lorem.words(20),
      price: faker.commerce.price(),
      type: faker.commerce.department(),
    };

    productPage.addProduct(
      longNameProduct.name,
      longNameProduct.price,
      longNameProduct.type
    );

    cy.wait(`@${ALIAS.ADD_PRODUCT}`).then((interception) => {
      productId = interception?.response?.body?.data?.id;

      productPage.verifyProductVisible(
        longNameProduct.name,
        longNameProduct.price,
        longNameProduct.type
      );
    });
  });
});
