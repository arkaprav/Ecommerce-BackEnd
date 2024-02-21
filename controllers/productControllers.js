const asyncHandler = require("express-async-handler");

const ProductsModel = require("../models/ProductsModel");

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

const createProduct = asyncHandler(async (req, res) => {
    const { name, brand, description, categoryId, purchasePrice, retailPrice, stock_qty } = req.body;
    if(!name){
        res.status(401);
        throw new Error("Invalid name");
    }
    if(!brand){
        res.status(401);
        throw new Error("Invalid brand");
    }
    if(!isNumeric(purchasePrice)){
        res.status(401);
        throw new Error("Invalid purchasePrice");
    }
    if(!isNumeric(retailPrice)){
        res.status(401);
        throw new Error("Invalid retailPrice");
    }
    if(!isNumeric(stock_qty)){
        res.status(401);
        throw new Error("Invalid stock_qty");
    }
    let image = "";
    if(req.file){
        image = 'data:image/png;base64,' +  req.file.buffer.toString("base64");
    }
    const product = await ProductsModel.create({
        name,
        description: description ? description : "",
        brand,
        categoryId,
        purchasePrice: parseFloat(purchasePrice),
        retailPrice: parseFloat(retailPrice),
        image,
        stock_qty: parseInt(stock_qty)
    });
    res.status(200).json(product);
});

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await ProductsModel.find().sort({ createdAt: -1 });
    res.status(200).json(products);
});

const getSingleProduct = asyncHandler(async (req, res) => {
    const product = await ProductsModel.findOne({ _id: req.params.id });
    if(!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    res.status(200).json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await ProductsModel.findOne({ _id: req.params.id });
    if(!product){
        res.status(404);
        throw new Error("Product not found");
    }
    const deletedProduct = await ProductsModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
    const product = await ProductsModel.findOne({ _id: req.params.id });
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
    const updatedProduct = await ProductsModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(updatedProduct);
});

module.exports = { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct };