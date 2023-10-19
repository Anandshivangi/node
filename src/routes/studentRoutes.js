const express = require("express");
const {
  signUp,
  login,
  read,
  showById,
  image,
  multipleImage,
} = require("../controller/studentController");
const upload = require("../middleware/multer");
const router = express.Router();

router.route("/knex/insert").post(signUp);
router.route("/knex/log").post(login);
router.route("/knex/show").get(read);
router.route("/knex/showById/:id").post(showById);

router.route("/knex/image").post(upload.single("image"), image);

router
  .route("/knex/multipleImage")
  .post(upload.array("image", 3), multipleImage);

module.exports = router;
