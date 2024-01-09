const express = require("express");
const { getAllProducts, getSingleProduct, getProductImage } = require("../controllers/productControllers");
const router = express.Router();


router.route('/all').get(getAllProducts);
router.route('/:id').get(getSingleProduct);
router.route('/product_image/:id').get(getProductImage);

module.exports = router;