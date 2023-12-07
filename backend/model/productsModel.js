const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    product_user: { 
        type: mongoose.Schema.Types.ObjectId,  // Agregar ususarios referenciado a collecion de Users
        required: true,
        ref: 'User'
    },
    product_name: {
        type: String,
        required: [true, "Type a Product Name"]
    },
    product_sku: {
        type: String,
        required: [true, "Type a Product SKU"]
    },
    product_description: {
        type: String,
        required: [true, "Type a Product Description"]
    }
}, {
    timestamps: true // crea campos automaticos de timestamps
})

module.exports = mongoose.model('Product', productSchema)  // MOdelo en  Letra Capital en singular por "tareas" collection