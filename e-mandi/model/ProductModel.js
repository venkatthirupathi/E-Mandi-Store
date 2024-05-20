const mongoose = require("mongoose");
const productmodelschema = mongoose.Schema({
  productId: String,
  imageUrl: String,
  productName: String,
  price: String,
  description: String,
  quantity: String,
});
const productmodel = mongoose.model("product", productmodelschema);
module.exports = productmodel;
