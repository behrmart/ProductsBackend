const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

//++++++++++++++++++++++++ Create User ++++++++++++++++++++++++++++++++++

const createUser = asyncHandler( async (req, res) => {
    const {name, email, password, esAdmin} = req.body

    if (!name || !email || !password){
        res.status(400)
        throw new Error ('usersController: Missing user data (name,email,password)')
    }

    // Verificar si ese usuario existe

    const userExiste = await User.findOne({ email })
    if (userExiste){
        res.status(400)
        throw new Error ('usersController: User already exist on DB')
    }

    // Hash al password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Crear nuevo usuario

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        esAdmin
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            admin: user.esAdmin
        })
    } else{
        res.status(400)
        throw new Error('usersController: Could not create user')
    }

})


//++++++++++++++++++++++++ Login User ++++++++++++++++++++++++++++++++++

const loginUser = asyncHandler( async (req, res) => {
    //desestructurar al body
    const {email,password} = req.body

    //verificamos que exita el usuario
    const user = await User.findOne({email})

    //verificamos usuario y contraseña
    if (user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id, // representacion mongoose en modo string (en lugar de objeto ._id)
            name: user.name,
            email: user.email,
            token: generarToken(user.id)})
    } else {
        res.status(400)
        throw Error ('usersController: Invalid credentials')
    }

})


//++++++++++++++++++++++++ User Data ++++++++++++++++++++++++++++++++++

const userData = asyncHandler( async (req, res) => {
    res.status(200).json(req.user)
})


//+++++++++++++++++++++++ Update User +++++++++++++++++++++++++++++++++ BFMM ---- Pending, user validation not working yet

const updateUser = asyncHandler( async (req,res) => {

 const user = req.user

//verificamos usuario 
if (user){
    const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json({userUpdated})
} else {
    res.status(400)
    throw Error ('usersController: User not auth')
}
}
)

// ++++++++++++++++++++++++ Funcion para generar un JWT jason web token
const generarToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, 
        {expiresIn: '30d' }) // JWT expira en 30 dias
}

module.exports = {
    createUser,
    loginUser,
    userData,
    updateUser
}