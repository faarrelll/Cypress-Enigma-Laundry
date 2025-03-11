import { faker } from "@faker-js/faker";
import productPage from "../../pages/productPage";
import ALIAS from "../../constants/alias.constants";

describe("Edit Product", () => {
  let productId;
  let originalProduct;
  let editedProduct;

  beforeEach(() => {
    originalProduct = {
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      type: faker.commerce.department(),
    };

    editedProduct = {
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      type: faker.commerce.department(),
    };

    cy.loginViaUi();
    productPage.visit();

    // Add a product to edit
    cy.interceptAddProduct();
    productPage.addProduct(
      originalProduct.name,
      originalProduct.price,
      originalProduct.type
    );
    cy.wait(`@${ALIAS.ADD_PRODUCT}`).then((interception) => {
      productId = interception?.response?.body?.data?.id;
    });
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

  it("should edit an existing product", () => {
    cy.interceptEditProduct(productId);

    productPage.editProduct(
      productId.split("-")[0],
      editedProduct.name,
      editedProduct.price,
      editedProduct.type
    );

    cy.wait(`@${ALIAS.EDIT_PRODUCT}`).then(() => {
      productPage.verifyProductVisible(
        editedProduct.name,
        editedProduct.price,
        editedProduct.type
      );
    });
  });

  it("should persist edited product after reload", () => {
    cy.interceptEditProduct(productId);

    productPage.editProduct(
      productId.split("-")[0],
      editedProduct.name,
      editedProduct.price,
      editedProduct.type
    );

    cy.wait(`@${ALIAS.EDIT_PRODUCT}`);

    cy.reload(true);

    productPage.verifyProductVisible(
      editedProduct.name,
      editedProduct.price,
      editedProduct.type
    );
  });

  it("should not close modal when fields are empty during edit", () => {
    productPage.getEditProductButton(productId.split("-")[0]).click();
    productPage.getNameInput().clear();
    productPage.getPriceInput().clear();
    productPage.getTypeInput().clear();
    productPage.getSubmitProductButton().click();
    productPage.getProductModal().should("be.visible");
    productId = null;
  });

  it("should close edit modal when modal close button is clicked", () => {
    productPage.getEditProductButton(productId.split("-")[0]).click();
    productPage.getProductModal().should("be.visible");
    productPage.getProductModalCloseButton().click();
    productPage.getProductModal().should("not.exist");
  });
});
