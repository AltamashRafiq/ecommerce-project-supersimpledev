import { sequelize } from "../models/index.js";
import { Product } from "../models/Product.js";

async function addProduct() {
  await sequelize.sync();

  const newProduct = await Product.create({
    // Required fields
    image: "altamash.jpg",
    name: "Altamushy",
    rating: { average: 5, count: 2344213 }, // Example rating object
    priceCents: 1999,
    keywords: ["cute", "handsome", "strong"],
    // Optional fields (createdAt, updatedAt will be set automatically if omitted)
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log("Product added:", newProduct.toJSON());
}

addProduct();
