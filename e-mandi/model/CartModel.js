const mongoose = require("mongoose");
const cartmodelschema = mongoose.Schema({
  cartItemID: String,
  userId: UserModel,
  ProductName: String,
  Quantity: int,
  Price: String,
});
const cartmodel = mongoose.model("cart", cartmodelschema);
module.exports = cartmodel;
