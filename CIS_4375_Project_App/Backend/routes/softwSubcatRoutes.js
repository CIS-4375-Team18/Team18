'use strict';

const express = require('express');
const softwCatContr = require('../controllers/softwSubCategoriesController');
const router = express.Router();
router.get('/softwcategories',softwCatContr.getAllsoftwwCategories);
router.get('/activehardwcategories',softwCatContr.getActivesoftwwSubCat);
router.get('/hardwcategory/:id', softwCatContr.getsoftwwSubCagtbyId);
router.post('/hardwcategory', softwCatContr.addsoftwwSubCat);
router.put('/hardwcategory/:id', softwCatContr.updatesoftwwSubCat);
router.delete('/hardwcategory/:id', softwCatContr.deletesoftwwSubCat);


module.exports = {
    routes: router
}