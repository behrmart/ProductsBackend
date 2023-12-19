const mongoose = require('mongoose')

const pedidoSchema = mongoose.Schema({
    pedido_user: { 
        type: mongoose.Schema.Types.ObjectId,  // Agregar ususarios referenciado a collecion de Users
        required: true,
        ref: 'User'
    },
    pedido_detail: { // Needs validating products on the DB TBD
        type: Array,
        required: [true, "Type Pedido Detail"]
    },
    pedido_instructions: {
        type: String,
        required: [true, "Type pedido instructions"]
    }
}, {
    timestamps: true // crea campos automaticos de timestamps
})

module.exports = mongoose.model('Pedido', pedidoSchema)  // MOdelo en  Letra Capital en singular por "pedidos" collection