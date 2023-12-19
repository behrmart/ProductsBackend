
const asyncHandler = require('express-async-handler')

const Pedido = require ('../model/pedidosModel')

const getPedidos = asyncHandler( async (req, res) => {
    const pedidos = await Pedido.find({pedido_user: req.user.id})
    res.status(200).json(pedidos)
})

const setPedidos = asyncHandler(async (req, res) => {
   
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

// Get all pedidos ADMIN
const getPedidosAdmin = asyncHandler( async (req, res) => {
    // verficar que product pertenezca al usuario del token que la quiere modificar

  if (!req.user.esAdmin){
      res.status(401)
      throw new Error ('Product_Controller|getProductsAdmin: Not ADMIN User, Access to all products not authorized')
  } else {
      const pedidos = await Pedido.find({})
      res.status(200).json(pedidos)
  }

})

//router.get('/:id', protect, getOnePedido)
const getOnePedido = asyncHandler(async (req, res) => {
    // verificamos que tarea exista
    const pedido = await Pedido.findById(req.params.id)
    if (!pedido){
        res.status(400)
        throw new Error('Pedido_Controller|getOnePedido: Pedido not found')
    }
    // verficar que pedido pertenezca al usuario del token que la quiere modificar

    if (pedido.pedido_user.toString() !== req.user.id){
        res.status(401)
        throw new Error ('Pedido_Controller|getOneProduct: Access to pedido not authorized')
    } else {

    res.status(200).json({pedido})
    }
})



module.exports = {
    getPedidos,
    getPedidosAdmin,
    getOnePedido,
    setPedidos,
}