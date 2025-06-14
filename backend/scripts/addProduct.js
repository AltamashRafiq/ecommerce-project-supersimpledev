import { sequelize } from "../models/index.js";
import { Product } from "../models/Product.js";

async function addProduct() {
  await sequelize.sync();

  const timestamp = Date.now();
  const newProduct = await Product.create({
    // Required fields
    id: "altamushy-id",
    image: "images/products/altamash.jpg",
    name: "Altamushy",
    rating: { stars: 5, count: 2344213 }, // Example rating object
    priceCents: 1999,
    keywords: ["cute", "handsome", "strong"],
    // Optional fields (createdAt, updatedAt will be set automatically if omitted)
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  console.log("Product added:", newProduct.toJSON());
}

addProduct();
