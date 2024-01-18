const express = require("express");
const { getAllProducts, getSingleProduct } = require("../controllers/productControllers");
const router = express.Router();


router.route('/all').get(getAllProducts);
router.route('/:id').get(getSingleProduct);

module.exports = router;