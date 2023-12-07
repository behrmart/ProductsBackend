
const asyncHandler = require('express-async-handler')

const Product = require ('../model/productsModel')

const getProducts = asyncHandler( async (req, res) => {
    const products = await Product.find({user: req.user.id})
    res.status(200).json(products)
})

const setProducts = asyncHandler(async (req, res) => {
    console.log(req.body)
    if (!req.body.product_name){
        res.status(400)
        throw new Error("Please type product name")
    }

    const product = await Product.create({
        product_name: req.body.product_name,
        product_user: req.user.id,
        product_sku: req.body.product_sku,
        product_description: req.body.product_description
    })
    res.status(201).json({ product })
})

const updateProducts = asyncHandler(async (req, res) => {
    // verificamos que tarea exista
    const product = await Tarea.findById(req.params.id)
    if (!tarea){
        res.status(400)
        throw new Error('Product not found')
    }

    // verficar que product pertenezca al usuario del token que la quiere modificar

    if (product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error ('Acceso no autorizado a Producto')
    } else {

    const productUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(productUpdated)
    }
})


const deleteProducts = asyncHandler(async (req, res) => {
    
    const product = await Product.findById(req.params.id)
    if (!product){
        res.status(400)
        throw new Error('Producto no fue encontrada')
    }

    //verificar que la tarea pertenezca al usuario del token que la quiere modificar
    if (product.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Acceso no autorizado')
    } else {
    await Product.deleteOne(product) //Las dos son correctas pero la otra busca dos veces

    //await Tarea.findByIdAndDelete(req.params.id)

    res.status(200).json({ id: req.params.id })
    }
})


module.exports = {
    getProducts,
    setProducts,
    updateProducts,
    deleteProducts
}