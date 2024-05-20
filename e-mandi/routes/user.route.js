const express = require("express");
const userroutes = express.Router();
const bodyParser = require("body-parser");

userroutes.use(bodyParser.json());

userroutes.use(bodyParser.urlencoded({ extended: true }));
userroutes.post("/login", (req, res) => {
  try {
  } catch (error) {}
});

userroutes.post("/signup", (req, res) => {
  try {
  } catch (error) {}
});

userroutes.get("/home", (req, res) => {
  try {
  } catch (error) {}
});

userroutes.post("/home/:id", (req, res) => {
  try {
  } catch (error) {}
});

userroutes.get("/cart/:id", (req, res) => {
  try {
  } catch (error) {}
});

userroutes.post("/cart/delete", (req, res) => {
  try {
  } catch (error) {}
});

userroutes.post("/saveOrder", (req, res) => {
  try {
  } catch (error) {}
});

userroutes.post("/orders", (req, res) => {
  try {
  } catch (error) {}
});

userroutes.post("/placeOrder", (req, res) => {
  try {
  } catch (error) {}
});

module.exports = userroutes;
