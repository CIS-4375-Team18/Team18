'use strict';

const express = require('express');
const subCatContr = require('../controllers/hardwSubCategoriesController');
const router = express.Router();
router.get('/hardwcategories',subCatContr.getAllHardwCategories);
router.get('/hardwcategoriesjoin',subCatContr.getAllHardwCategoriesJoin);   
router.get('/activehardwcategories',subCatContr.getActiveHardwSubCat);
router.get('/hardwcategory/:id', subCatContr.getHardwSubCagtbyId);
router.post('/hardwcategory', subCatContr.addHardwSubCat);
router.put('/hardwcategory/:id', subCatContr.updateHardwSubCat);
router.delete('/hardwcategory/:id', subCatContr.deleteHardwSubCat);


module.exports = {
    routes: router
}