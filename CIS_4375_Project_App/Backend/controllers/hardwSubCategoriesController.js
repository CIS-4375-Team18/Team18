"use strict";

const hardwSubCatData = require("../data/hardwSubcategories");

// Retrieve all hardwSubCat regardless of active status (active or inactive)
const getAllHardwCategories = async (req, res, next) => {
  try {
    const hardwSubCatList = await hardwSubCatData.GetAll();
    res.send(hardwSubCatList);
    console.log(hardwSubCatList);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Retrieve all hardwSubCat with join to active status table
const getAllHardwCategoriesJoin = async (req, res, next) => {
  try {
    const hardwSubCatList = await hardwSubCatData.GetAllJoin();
    res.send(hardwSubCatList);
    console.log(hardwSubCatList);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Retrieve all active hardwSubCat
const getActiveHardwSubCat = async (req, res, next) => {
  try {
    const hardwSubCatList = await hardwSubCatData.GetActive();
    res.send(hardwSubCatList);
    console.log(hardwSubCatList);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Retrieve a single hardwSubCat by ID
const getHardwSubCagtbyId = async (req, res, next) => {
  try {
    const HARDW_SUB_CATEGORY_ID = req.params.id;
    const hardwSubCatList = await hardwSubCatData.getById(
      HARDW_SUB_CATEGORY_ID
    );
    res.send(hardwSubCatList);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Create a new hardwSubCat
const addHardwSubCat = async (req, res, next) => {
  try {
    const data = req.body;
    const insert = await hardwSubCatData.insertNew(data);
    res.send(insert);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Update a hardwSubCat
const updateHardwSubCat = async (req, res, next) => {
  try {
    const HARDW_SUB_CATEGORY_ID = req.params.id;
    const data = req.body;
    const updated = await hardwSubCatData.update(HARDW_SUB_CATEGORY_ID, data);
    res.send(updated);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Delete a hardwSubCat
const deleteHardwSubCat = async (req, res, next) => {
  try {
    const subCatData = req.params.id;
    const delHardwSubCat = await hardwSubCatData.del(subCatData);
    res.send(delHardwSubCat);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getActiveHardwSubCat,
  getHardwSubCagtbyId,
  getAllHardwCategories,
  addHardwSubCat,
  updateHardwSubCat,
  deleteHardwSubCat,
  getAllHardwCategoriesJoin,
};
