const express = require("express");
const ProductManager = require("./data/ProductManager");

const PORT = 3000;
const app = express();

const pm = new ProductManager("./data/products.json");

app.get("/", (req, res) => {
  res.send("Server básico prueba CODERHOUSE");
});

app.get("/products", async (req, res) => {
  let products;
  try {
    products = await pm.getProducts();
  } catch (error) {
    console.log(error.message);
  }

  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server ONLINE en puerto ${PORT}`);
});
