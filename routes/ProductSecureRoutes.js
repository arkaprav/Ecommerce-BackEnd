const express = require("express");
const { createProduct, updateProduct, deleteProduct } = require("../controllers/productControllers");
const validateAdmin = require("../middlewares/validateAdmin");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});

router.use(validateAdmin);
router.use(upload.single("product_image"));
router.route('/').post(createProduct);
router.route('/:id').put(updateProduct).delete(deleteProduct);

module.exports = router;