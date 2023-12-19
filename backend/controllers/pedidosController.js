
const asyncHandler = require('express-async-handler')

const Pedido = require ('../model/pedidosModel')

const getPedidos = asyncHandler( async (req, res) => {
    const pedidos = await Product.find({product_user: req.user.id})
    res.status(200).json(pedidos)
})

const setPedidos = asyncHandler(async (req, res) => {
    console.log(req.body)
    if (!req.body.pedido_detail){
        res.status(400)
        throw new Error("Pedidos_Controller|setPedidos: Please type pedidos detail")
    }

    const pedido = await Pedido.create({
        pedido_user: req.user.id,
        pedido_detail: req.body.pedido_detail,
        pedido_instructions: req.body.pedido_instructions
    })
    res.status(201).json({ pedido })
})

module.exports = {
    getPedidos,
    setPedidos,
}