const fs = require("fs");

class ProductManager {
  constructor(rutaArchivo) {
    this.path = rutaArchivo;
  }

  async getProducts() {
    if (fs.existsSync(this.path)) {
      return JSON.parse(
        await fs.promises.readFile(this.path, { encoding: "utf-8" })
      );
    } else {
      return [];
    }
  }

  async addProducts(title, description, price, thumbnail, code, stock) {
    let products = await this.getProducts();

    let id = 1;
    if (products.length > 0) {
      id = Math.max(...products.map((products) => products.id)) + 1;
    }

    products.push({
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });

    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 5));
  }
}

const funcion1 = async () => {
  let pm = new ProductManager("./data/products.json");
  await pm.addProducts(
    "Cafe",
    "Cafe Tostado molienda media-fina para Moka italiana o Melita",
    8600,
    "./img/cafecolombia.jpg",
    98465412134598,
    50
  );
};

funcion1();

module.exports = ProductManager;
