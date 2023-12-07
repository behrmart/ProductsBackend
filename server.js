// Projecto Backend Products Kata Backend Avanzado DEV.f Master en Coding
// por Bernardo F. Martinez Meave @bfelipmm
// Stardate 20231206

const express = require ('express')
const colors = require('colors')
const dotenv = require ('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

connectDB()

const app = express()

app.use(express.json()) //para recibir info por un formulario en body
app.use(express.urlencoded({extended: false}))


app.use('/api/tareas', require('./routes/tareasRoutes'))
app.use('/api/users', require('./routes/usersRoutes'))

app.use(errorHandler)

app.listen(port, ()=> console.log(`Servidor Iniciado en puerto ${port}`.cyan))