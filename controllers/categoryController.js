const asyncHandler = require("express-async-handler");

const path = require("path");
const CategoryModel = require("../models/CategoryModel");

const createCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    if(!name){
        res.status(401);
        throw new Error("Invalid name");
    }
    let imagePath = "";
    if(req.file){
        imagePath = req.file.path;
    }else {
        imagePath = path.join(__dirname, "products", "default.png");
    }
    const category = await CategoryModel.create({
        name,
        description: description ? description : "",
        imagePath,
    });
    res.status(200).json(category);
});

const getAllCategory = asyncHandler(async (req, res) => {
    const category = await CategoryModel.find();
    res.status(200).json(category);
});

const getSingleCategory = asyncHandler(async (req, res) => {
    const category = await CategoryModel.findOne({ _id: req.params.id });
    if(!category) {
        res.status(404);
        throw new Error("Category not found");
    }
    res.status(200).json(category);
});

const deleteCategory = asyncHandler(async (req, res) => {
    const category = await CategoryModel.findOne({ _id: req.params.id });
    if(!category){
        res.status(404);
        throw new Error("Category not found");
    }
    const deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedCategory);
});

const updateCategory = asyncHandler(async (req, res) => {
    const category = await CategoryModel.findOne({ _id: req.params.id });
    if(!category){
        res.status(404);
        throw new Error("Category not found");
    }
    let imagePath = category.imagePath;
    if(req.file){
        imagePath = req.file.path;
    }
    req.body = {
        ...req.body,
        imagePath
    };
    const updatedCategory = await CategoryModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(updatedCategory);
});

const getCategoryImage = asyncHandler(async (req, res) => {
    const category = await CategoryModel.findOne({ _id: req.params.id });
    if(!category){
        res.status(404);
        throw new Error("Category not found");
    }
    const options = {
        root: path.join(__dirname,"../")
    };
    const imagePath = category.imagePath;
    const absPath = "/" + imagePath.split("\\")[0] + "/" + imagePath.split("\\")[1];
    res.sendFile(absPath, options, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Sent:', absPath);
        }
    });
});

module.exports = { createCategory, getAllCategory, getSingleCategory, updateCategory, deleteCategory, getCategoryImage };