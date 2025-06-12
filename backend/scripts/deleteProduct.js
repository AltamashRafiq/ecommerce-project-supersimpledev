import { sequelize } from "../models/index.js";
import { Product } from "../models/Product.js";

async function deleteProduct() {
  await sequelize.sync();

  // Change this to the name or id of the product you want to delete
  const productName = "Altamusy";

  const deletedCount = await Product.destroy({
    where: { name: productName },
  });

  if (deletedCount > 0) {
    console.log(
      `Deleted ${deletedCount} product(s) with name '${productName}'.`
    );
  } else {
    console.log(`No product found with name '${productName}'.`);
  }
}

deleteProduct();
