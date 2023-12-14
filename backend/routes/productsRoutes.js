// Product Endpoints

const express = require ('express')
const router = express.Router()
const {getProducts, setProducts, getOneProduct, updateProducts, deleteProducts} = require('../controllers/productsController')
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getProducts)
router.post('/', protect,  setProducts)

router.get('/:id', protect, getOneProduct)
router.put('/:id', protect, updateProducts)
router.delete('/:id', protect, deleteProducts)

module.exports = router