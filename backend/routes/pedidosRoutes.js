// Pedidos Endpoints

const express = require ('express')
const router = express.Router()
const {getPedidos, setPedidos, getOnePedido, updatePedido, deletePedido} = require('../controllers/pedidosController')
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getPedidos)
router.post('/', protect,  setPedidos)

//router.get('/:id', protect, getOnePedido)
//router.put('/:id', protect, updatePedido)
//router.delete('/:id', protect, deletePedido)

module.exports = router