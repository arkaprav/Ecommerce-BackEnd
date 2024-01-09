const asyncHandler = require("express-async-handler");

const path = require("path");
const ProductsModel = require("../models/ProductsModel");
const axios = require("axios");

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

const createProduct = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, brand, description, purchasePrice, retailPrice } = req.body;
    if(!name){
        res.status(401);
        throw new Error("Invalid name");
    }
    if(!brand){
        res.status(401);
        throw new Error("Invalid brand");
    }
    console.log(isNumeric(purchasePrice));
    console.log(isNumeric(retailPrice));
    if(!isNumeric(purchasePrice)){
        res.status(401);
        throw new Error("Invalid purchasePrice");
    }
    if(!isNumeric(retailPrice)){
        res.status(401);
        throw new Error("Invalid retailPrice");
    }
    let imagePath = "";
    if(req.file){
        imagePath = req.file.path;
    }else {
        imagePath = path.join(__dirname, "products", "default.png");
    }
    console.log({
        name,
        description: description ? description : "",
        brand,
        purchasePrice: parseFloat(purchasePrice),
        retailPrice: parseFloat(retailPrice),
        imagePath,
        adminId: req.admin.id
    });
    const product = await ProductsModel.create({
        name,
        description: description ? description : "",
        brand,
        purchasePrice: parseFloat(purchasePrice),
        retailPrice: parseFloat(retailPrice),
        imagePath,
        adminId: req.admin.id
    });
    res.status(200).json(product);
});

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await ProductsModel.find({ adminId: req.admin.id });
    res.status(200).json(products);
});

const getSingleProduct = asyncHandler(async (req, res) => {
    const product = await ProductsModel.findOne({ _id: req.params.id, adminId: req.admin.id });
    if(!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    res.status(200).json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await ProductsModel.findOne({ _id: req.params.id, adminId: req.admin.id });
    if(!product){
        res.status(404);
        throw new Error("Product not found");
    }
    res.status(200).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
    const product = await ProductsModel.findOne({ _id: req.params.id, adminId: req.admin.id });
    if(!product){
        res.status(404);
        throw new Error("Product not found");
    }
    let imagePath = product.imagePath;
    if(req.file){
        imagePath = req.file.path;
    }
    req.body = {
        ...req.body,
        imagePath
    };
    const updatedProduct = await ProductsModel.findByIDAndUpdate(req.params.id, req.body);
    res.status(200).json(updatedProduct);
});

const getProductImage = asyncHandler(async (req, res) => {
    const product = await ProductsModel.findOne({ _id: req.params.id, adminId: req.admin.id });
    if(!product){
        res.status(404);
        throw new Error("Product not found");
    }
    const options = {
        root: path.join(__dirname,"../")
    };
    const imagePath = product.imagePath;
    const absPath = "/" + imagePath.split("\\")[0] + "/" + imagePath.split("\\")[1];
    res.sendFile(absPath, options, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Sent:', absPath);
        }
    });
});

module.exports = { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, getProductImage };