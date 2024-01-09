const express = require("express");
const { getAllSubscribers } = require("../controllers/SubscribersControllers");
const router = express.Router();
const validateAdmin = require("../middlewares/validateAdmin");

router.use(validateAdmin);
router.route('/all').get(getAllSubscribers);

module.exports = router;