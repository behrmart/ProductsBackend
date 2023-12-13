// Projecto Backend Products Kata Backend Avanzado DEV.f Master en Coding
// por Bernardo F. Martinez Meave @bfelipmm
// Stardate 20231206

const express = require ('express')
const colors = require('colors')
const dotenv = require ('dotenv').config()
const port = process.env.PORT || 5003
const connectDB = require ('./backend/config/db')
const { errorHandler } = require('./backend/middleware/errorMiddleware')

connectDB()

const app = express()

app.use(express.json()) //para recibir info por un formulario en body
app.use(express.urlencoded({extended: false}))


app.use('/api/products', require('./backend/routes/productsRoutes'))
app.use('/api/users', require('./backend/routes/usersRoutes'))

app.use(errorHandler)

app.listen(port, ()=> console.log(`Servidor Iniciado en puerto ${port}`.cyan))