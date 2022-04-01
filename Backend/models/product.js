const mongoose =require('mongoose');

const productSchema =mongoose.Schema ({
    name: String,
    image :{
        type: String,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    }
})

// exporting the product
exports.Product =mongoose.model('Product',productSchema);

