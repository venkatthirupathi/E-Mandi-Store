const mongoose = require("mongoose");
const ordermodelschema = mongoose.Schema({
  orderId: String,
  userId: String,
  ProductName: String,
  quantity: int,
  totalPrice: String,
  Status: String,
  Price: String,
});
const ordermodel = mongoose.model("order", ordermodelschema);
module.exports = ordermodel;
