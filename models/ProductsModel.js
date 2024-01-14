const mongoose = require("mongoose");

const productsSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "name is required"],
        },
        description: {
            type: String,
        },
        categoryId: {
            type: String,
            default: ""
        },
        brand:{
            type: String,
            required: [true, "brand is required"],
        },
        purchasePrice:{
            type: Number,
            required: [true, "purchasePrice is required"],
        },
        retailPrice:{
            type: Number,
            required: [true, "retailPrice is required"],
        },
        imagePath:{
            type: String,
            required: [true, "ImagePath is required"],
        },
    },{
        timestmps: true
    }
);

module.exports = mongoose.model("Products", productsSchema);