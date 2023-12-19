
const asyncHandler = require('express-async-handler')

const Product = require ('../model/productsModel')

const getProducts = asyncHandler( async (req, res) => {
    const products = await Product.find({product_user: req.user.id})
    res.status(200).json(products)
})

const setProducts = asyncHandler(async (req, res) => {
    console.log(req.body)
    if (!req.body.product_name){
        res.status(400)
        throw new Error("Product_Controller|setProducts: Please type product name")
    }

    const product = await Product.create({
        product_user: req.user.id,
        product_name: req.body.product_name,
        product_sku: req.body.product_sku,
        product_description: req.body.product_description
    })
    res.status(201).json({ product })
})

// Get all products ADMIN
const getProductsAdmin = asyncHandler( async (req, res) => {
      // verficar que product pertenezca al usuario del token que la quiere modificar
    if (!req.user.esAdmin){
        res.status(401)
        throw new Error ('Product_Controller|getProductsAdmin: Not ADMIN User, Access to all products not authorized')
    } else {
        const products = await Product.find({})
        res.status(200).json(products)
    }

})


//router.get('/:id', protect, getOneProduct)
const getOneProduct = asyncHandler(async (req, res) => {
    // verificamos que tarea exista
    const product = await Product.findById(req.params.id)
    if (!product){
        res.status(400)
        throw new Error('Product_Controller|getOneProducts: Product not found')
    }

    // verficar que product pertenezca al usuario del token que la quiere modificar

    if (product.product_user.toString() !== req.user.id){
        res.status(401)
        throw new Error ('Product_Controller|getOneProduct: Access to product not authorized')
    } else {

    res.status(200).json({product})
    }
})


// router.put('/:id', protect, updateProducts)

const updateProducts = asyncHandler(async (req, res) => {
    // verificamos que tarea exista
    const product = await Product.findById(req.params.id)
    if (!product){
        res.status(400)
        throw new Error('Product_Controller|updateProducts: Product not found')
    }

    // verficar que product pertenezca al usuario del token que la quiere modificar

    if (product.product_user.toString() !== req.user.id){
        res.status(401)
        throw new Error ('Product_Controller|updateProducts: Access to product not authorized')
    } else {

    const productUpdated = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json({productUpdated})
    }
})


//router.delete('/:id', protect, deleteProducts)

const deleteProducts = asyncHandler(async (req, res) => {
    
    const product = await Product.findById(req.params.id)
    if (!product){
        res.status(400)
        throw new Error('Product_Controller: Producto no fue encontrada')
    }

    //verificar que la tarea pertenezca al usuario del token que la quiere modificar
    if (product.product_user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Product_Controller: Acceso no autorizado')
    } else {
    await Product.deleteOne(product) //Las dos son correctas pero la otra busca dos veces

    //await Tarea.findByIdAndDelete(req.params.id)

    res.status(200).json({ id: req.params.id })
    }
})


module.exports = {
    getProducts,
    getProductsAdmin,
    setProducts,
    getOneProduct,
    updateProducts,
    deleteProducts
}