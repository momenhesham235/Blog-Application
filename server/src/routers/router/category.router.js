const router = require("express").Router();

const {
  createCategory,
  getAllCategories,
  deleteCategory,
} = require("../../controllers/category.controller");

const { verifyTokenAndAdmin } = require("../../middlewares/verifyToken");
const validationObjectId = require("../../middlewares/validationObjectId");

router
  .route("/")
  .post(verifyTokenAndAdmin, createCategory)
  .get(getAllCategories);

router
  .route("/:id")
  .delete(validationObjectId, verifyTokenAndAdmin, deleteCategory);

module.exports = router;
