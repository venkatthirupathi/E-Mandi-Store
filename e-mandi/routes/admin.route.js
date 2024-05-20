const express = require("express");
const adminroutes = express.Router();

const bodyParser = require("body-parser");

adminroutes.use(bodyParser.json());

adminroutes.use(bodyParser.urlencoded({ extended: true }));

adminroutes.get("/admin", (req, res) => {
  try {
  } catch (error) {}
});

adminroutes.post("/admin/addProduct", (req, res) => {
  try {
  } catch (error) {}
});

adminroutes.get("/admin/delete/:id", (req, res) => {
  try {
  } catch (error) {}
});

adminroutes.get("/admin/productEdit/:id", (req, res) => {
  try {
  } catch (error) {}
});

adminroutes.post("/admin/productEdit/:id", (req, res) => {
  try {
  } catch (error) {}
});

adminroutes.get("/admin/orders", (req, res) => {
  try {
  } catch (error) {}
});

module.exports = adminroutes;
