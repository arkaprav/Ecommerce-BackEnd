const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        description: {
            type: String,
        },
        no_of_products:{
            type: Number,
            default: 0
        },
        imagePath:{
            type: String,
            required: [true, "ImagePath is required"],
        },
    },{
        timestamps: true
    }
);

module.exports = mongoose.model("Category", CategorySchema);