const express = require("express");
const { createProduct, updateProduct, deleteProduct } = require("../controllers/productControllers");
const validateAdmin = require("../middlewares/validateAdmin");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: './products',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.jpeg`);
  },
});

const upload = multer({ storage });

router.use(validateAdmin);
router.use(upload.single("product_image"));
router.route('/').post(createProduct);
router.route('/:id').put(updateProduct).delete(deleteProduct);

module.exports = router;