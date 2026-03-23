# DeliverUS Exam - October

Remember that DeliverUS is described at: <https://github.com/IISSI2-IS-2025>

## Exam Statement

We must incorporate a new requirement into the DeliverUS application: product categories can now be edited by restaurant owners, meaning each restaurant will have its own product categories.  
The following conceptual model has been provided:

![Conceptual Model](./DeliverUS-Backend/DeliverUS-EntityDiagram-ProductCategory.drawio.svg)

The implementation of the following functional requirements is required:

---

### FR1. List of Product Categories

**As an** owner,  
**I want** to list all the product categories of my restaurant.

**Route:** `GET /productCategories/restaurants/:restaurantId`

**Acceptance Tests:**

- Returns an array with all the product categories of the specified restaurant.  
  The JSON object returned must have the following structure:

  ```Javascript
  [{
      id: 1,
      restaurantId: 1,
      name: "Starters",
      createdAt: "2025-03-12T16:33:20.000Z",
      updatedAt: "2025-03-12T16:33:20.000Z",
  },
  {
      id: 2,
      restaurantId: 1,
      name: "Sides",
      createdAt: "2025-03-12T16:33:20.000Z",
      updatedAt: "2025-03-12T16:33:20.000Z",
  }]
  ```

- Returns code `401` if the user is not authenticated.
- Returns code `403` if the user is not the owner of the restaurant.
- Returns code `404` if the restaurant does not exist.

---

### FR2. Creation of a Product Category

**As an** owner,  
**I want** to create a new product category  
**So that** I can assign it to my products.

**Route:** `POST /productCategories/restaurants/:restaurantId`

- The product category to be created includes the `name` attribute.  
  It receives a JSON object in the request body as shown in the example below:

  ```Javascript
  {
      restaurantId: 1,
      name: "New Category"
  }
  ```

- Returns code `401` if the user is not authenticated.
- Returns code `403` if the user is not the owner of the restaurant.
- Returns code `404` if the restaurant does not exist.
- Returns code `422` if attributes are missing or validation fails.

---

### FR3. Deletion of a Product Category

**As an** owner,  
**I want** to delete a product category that I no longer need.

**Route:** `DELETE /productCategories/:restaurantId/categories/:categoryId`

**Acceptance Tests:**

- Successfully deletes the specified product category **only if there are no products associated with it**.
- Returns code `401` if the user is not authenticated.
- Returns code `403` if the user is not the owner of the restaurant.
- Returns code `404` if the restaurant or category does not exist.

---

## Exercises

### 1. Migrations, Models, and Required Changes (2 points)

Create and modify the necessary migrations to implement the conceptual model, as well as the corresponding models.

Complete the files `/src/database/migrations/20210718065004-create-product-category.js` and `/src/models/ProductCategory.js`, along with any required modifications to other files.

---

### 2. ProductCategory Routes (2 points)

Implement the following routes:

- FR1: **GET** `/productCategories/restaurants/:restaurantId`
- FR2: **POST** `/productCategories/restaurants/:restaurantId`
- FR3: **DELETE** `/productCategories/:restaurantId/categories/:categoryId`

You are provided with the file `/src/routes/ProductCategoryRoutes.js` to define these routes.  
Remember to include the necessary middlewares for each route.

---

### 3. ProductCategory Validations (1 point)

Implement the validation rules for the creation and editing of a category.  
You are provided with the file `/src/controllers/Validation/ProductCategoryValidation.js` to define these validations.

---

### 4. ProductCategory Controller (3 points)

Implement the necessary functions for FR1, FR2, and FR3.  
You are provided with the file `/src/controllers/ProductCategoryController.js` to define these functions.

---

### 5. Check That the Owner Can Delete a Product Category (2 points)

Implement the verification that an owner must pass to delete a product category, specifically:

1. There are **no products** assigned to that category.
2. The restaurant associated with that product category belongs to the user making the request.

You are provided with the file `/src/middlewares/ProductCategoryMiddleware.js` containing the prototypes of the functions  
`checkNoProductsInCategory` and `checkProductCategoryOwnership`, which you must implement.

---

## Additional Important Information

- **Routes and validations must be implemented exactly as described here, since automated tests rely on these specifications.**
- **Do not modify the tests.** The file `/tests/e2e/productCategories.test.js` explicitly checks the routes, data structures, validations, and associations described above.

---

## Submission Procedure

1. Delete the **node_modules** folders from the backend.
2. Create a ZIP file that includes the entire project.  
   **Important:** Make sure the ZIP is not the same one you downloaded and that it includes your solution.
3. Notify the instructor before submitting.
4. Once the instructor approves, you may upload the ZIP to the Virtual Learning Platform.  
   **It is very important to wait until the platform shows a link to your ZIP file before clicking the submit button.**  
   It is recommended to download that ZIP afterward to verify that your submission was uploaded correctly.  
   Once verified, you may submit the exam.

---

## Environment Setup

### a) Windows

Open a terminal and run the command `npm run install:all:win`.  
To execute this instruction successfully, you must have completed Exercise 1 correctly.

### b) Linux/MacOS

Open a terminal and run the command `npm run install:all:bash`.  
To execute this instruction successfully, you must have completed Exercise 1 correctly.

---

## Execution

### Backend

- To **recreate migrations and seeders**, open a terminal and run:

  ```bash
  npm run migrate:backend
  ```

- To **run the backend**, open a terminal and run:

  ```bash
  npm run start:backend
  ```

---

## Debugging

To **debug the backend**, ensure that **no instance** is currently running.  
Click the `Run and Debug` button on the sidebar, select `Debug Backend` from the dropdown list, and press the _Play_ button.

---

## Tests

To verify that the backend works correctly, you can execute the included test suite by running the following command:

```bash
npm run test:backend
```

**Warning:** The test files must not be modified.

---

## Port Issues

Sometimes, backend processes — with or without debugging — may remain blocked without releasing the used ports, preventing new processes from starting.  
It is recommended to close and reopen **Visual Studio Code** to terminate such processes.
