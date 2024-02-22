const express = require("express");
const ProductManager = require("./data/ProductManager");

const PORT = 3000;
const app = express();

const pm = new ProductManager("./data/products.json");

app.get("/", (req, res) => {
  res.send("Server básico prueba CODERHOUSE");
});

app.get("/products", async (req, res) => {
  let { limit, skip } = req.query;

  let products;
  try {
    products = await pm.getProducts();
  } catch (error) {
    console.log(error.message);
  }

  if (skip && skip > 0) {
    products = products.slice(skip);
  }

  if (limit && limit > 0) {
    products = products.slice(0, limit);
  }

  res.json(products);
});

app.get("/products/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await pm.getProductById(productId);
    if (product) {
      const { title, description, price, code, stock } = product;
      const htmlRes = `
          <h2>${title}</h2>
          <h3>$ ${price}</h3>
          <h5>Codigo: ${code}</h5>
          <h5>Unidades disponibles: ${stock}</h5>
          <p>${description}</p>
        `;
      res.send(htmlRes);
    } else {
      const htmlResError = `<h2>Producto no encontrado</h2>`;
      res.send(htmlResError);
    }
  } catch (error) {
    next(error);
  }
});

app.get("*", (req, res) => {
  const NotFoundHTML = `<h1>Error 404 - Not Found</h1>`;
  res.send(NotFoundHTML);
});

app.listen(PORT, () => {
  console.log(`Server ONLINE en puerto ${PORT}`);
});
