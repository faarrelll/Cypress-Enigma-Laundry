import { faker } from "@faker-js/faker";
import productPage from "../../pages/productPage";
import ALIAS from "../../constants/alias.constants";

describe("Delete Product", () => {
  let productId;
  let product;

  beforeEach(() => {
    product = {
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      type: faker.commerce.department(),
    };

    cy.loginViaUi();
    productPage.visit();

    // Add a product to delete
    cy.interceptAddProduct();
    productPage.addProduct(product.name, product.price, product.type);
    cy.wait(`@${ALIAS.ADD_PRODUCT}`).then((interception) => {
      productId = interception?.response?.body?.data?.id;
    });
  });

  it("should delete an existing product", () => {
    cy.interceptDeleteProduct(productId);

    productPage.deleteProduct(productId.split("-")[0]);

    cy.wait(`@${ALIAS.DELETE_PRODUCT}`).then(() => {
      productPage.verifyProductDeleted(productId.split("-")[0]);
    });
  });

  it("should show confirmation dialog before deleting", () => {
    productPage.getDeleteProductButton(productId.split("-")[0]).click();
    cy.get(".swal2-popup").should("be.visible");
    cy.get(".swal2-cancel").click();
    productPage.verifyProductVisible(product.name, product.price, product.type);
  });

  it("should not delete product when cancelling confirmation", () => {
    productPage.getDeleteProductButton(productId.split("-")[0]).click();
    cy.get(".swal2-cancel").click();
    productPage.verifyProductVisible(product.name, product.price, product.type);
  });

  it("should update product list after deletion", () => {
    cy.interceptDeleteProduct(productId);
    cy.interceptGetAllProducts();

    productPage.deleteProduct(productId.split("-")[0]);

    cy.wait(`@${ALIAS.DELETE_PRODUCT}`);
    cy.wait(`@${ALIAS.GET_ALL_PRODUCTS}`);

    productPage.verifyProductDeleted(productId.split("-")[0]);
  });
});
