'use strict';

const express = require('express');
const softwCatContr = require('../controllers/softwSubCategoriesController');
const router = express.Router();
router.get('/softwcategories',softwCatContr.getAllsoftwCategories);
router.get('/softwcategoriesjoin',softwCatContr.getAllsoftwCategoriesJoin);
router.get('/activesoftwcategories',softwCatContr.getActivesoftwSubCat);
router.get('/softwcategory/:id', softwCatContr.getsoftwSubCagtbyId);
router.post('/softwcategory', softwCatContr.addsoftwSubCat);
router.put('/softwcategory/:id', softwCatContr.updatesoftwSubCat);
router.delete('/softwcategory/:id', softwCatContr.deletesoftwSubCat);


module.exports = {
    routes: router
}