// Pedidos Endpoints

const express = require ('express')
const router = express.Router()
const {getPedidos, setPedidos, getPedidosAdmin, getOnePedido, updatePedido, deletePedido} = require('../controllers/pedidosController')
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getPedidos)
router.post('/', protect,  setPedidos)

router.get('/admin', protect, getPedidosAdmin)
router.get('/:id', protect, getOnePedido)

module.exports = router