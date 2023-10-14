"use strict";

const softwwSubCatData = require("../data/softwSubCategories");

// Retrieve all softwwSubCat
const getAllsoftwwCategories = async (req, res, next) => {
  try {
    const softwwSubCatList = await softwwSubCatData.GetAll();
    res.send(softwwSubCatList);
    console.log(softwwSubCatList);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Retrieve all active softwwSubCat
const getActivesoftwwSubCat = async (req, res, next) => {
  try {
    const softwwSubCatList = await softwwSubCatData.GetActive();
    res.send(softwwSubCatList);
    console.log(softwwSubCatList);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//  Retrieve a single softwwSubCat by ID
const getsoftwwSubCagtbyId = async (req, res, next) => {
  try {
    const softwW_SUB_CATEGORY_ID = req.params.id;
    const softwwSubCatList = await softwwSubCatData.getById(
      softwW_SUB_CATEGORY_ID
    );
    res.send(softwwSubCatList);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Create a new softwwSubCat
const addsoftwwSubCat = async (req, res, next) => {
  try {
    const data = req.body;
    const insert = await softwwSubCatData.insertNew(data);
    res.send(insert);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Update a softwwSubCat
const updatesoftwwSubCat = async (req, res, next) => {
  try {
    const softwW_SUB_CATEGORY_ID = req.params.id;
    const data = req.body;
    const updated = await softwwSubCatData.update(softwW_SUB_CATEGORY_ID, data);
    res.send(updated);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Delete a softwwSubCat
const deletesoftwwSubCat = async (req, res, next) => {
  try {
    const subCatData = req.params.id;
    const delsoftwwSubCat = await softwwSubCatData.del(subCatData);
    res.send(delsoftwwSubCat);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getActivesoftwwSubCat,
  getsoftwwSubCagtbyId,
  getAllsoftwwCategories,
  addsoftwwSubCat,
  updatesoftwwSubCat,
  deletesoftwwSubCat,
};
