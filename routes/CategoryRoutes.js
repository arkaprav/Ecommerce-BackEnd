const express = require("express");
const { getAllCategory, getSingleCategory, getCategoryImage } = require("../controllers/categoryController");
const router = express.Router();


router.route('/all').get(getAllCategory);
router.route('/:id').get(getSingleCategory);
router.route('/category_image/:id').get(getCategoryImage);

module.exports = router;