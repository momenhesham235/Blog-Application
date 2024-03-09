const asyncHandler = require("express-async-handler");
const Category = require("../models/category.model");
const {
  validateCreateCategory,
} = require("../utils/validation/categoryValidation");
const { SUCCESS, FAIL } = require("../utils/httpStatusText");

/**-----------------------------------------------
 * @desc    Create New Category
 * @route   /api/v1/categories
 * @method  POST
 * @access  private (only admin)
 ------------------------------------------------*/
const createCategory = asyncHandler(async (req, res) => {
  // validate request body
  const { error } = validateCreateCategory(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: FAIL, message: error.details[0].message });
  }

  // create category
  const category = await Category.create({
    title: req.body.title,
    user: req.user.id,
  });

  // send response
  res.status(201).json({
    status: SUCCESS,
    message: "Category created successfully",
    data: category,
  });
});

/**-----------------------------------------------
 * @desc    Get All Categories
 * @route   /api/v1/categories
 * @method  GET
 * @access  public
 ------------------------------------------------*/
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  if (!categories) {
    return res.status(400).json({
      status: FAIL,
      message: "Categories not found",
      data: null,
    });
  }

  res.status(200).json({
    status: SUCCESS,
    message: "Categories fetched successfully",
    data: categories,
  });
});

/**-----------------------------------------------
 * @desc    Delete Category
 * @route   /api/categories/:id
 * @method  DELETE
 * @access  private (only admin)
 ------------------------------------------------*/
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // check if category exists
  const category = await Category.findById(id);
  if (!category) {
    return res
      .status(404)
      .json({ status: FAIL, message: "category not found" });
  }

  await Category.findByIdAndDelete(id);

  res.status(200).json({
    status: SUCCESS,
    message: "category has been deleted successfully",
    categoryId: category._id,
  });
});
module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory,
};
