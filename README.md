# ProductsBackend

// Projecto Backend Products Kata Backend Avanzado DEV.f Master en Coding
// por Bernardo F. Martinez Meave @bfelipemm
// Stardate 20231222

// Node.js Express MongoDB Mongoose JWT bcrypt

// Deployed in Cyclic

API deployed at:
https://erin-thoughtful-millipede.cyclic.app

EndPoints:

// Users

User Login (gets user JWT):
POST https://erin-thoughtful-millipede.cyclic.app/api/users/login

Register User:
POST https://erin-thoughtful-millipede.cyclic.app/api/users

Get User Data requires user JWT
GET https://erin-thoughtful-millipede.cyclic.app/api/users/id

Update User Data requires user JWT
PUT https://erin-thoughtful-millipede.cyclic.app/api/users/id

// Products

New Product requires user JWT:
POST https://erin-thoughtful-millipede.cyclic.app/api/products

All Products ADMIN JWT
GET https://erin-thoughtful-millipede.cyclic.app/api/products/admin

Update One product requires user JWT
PUT https://erin-thoughtful-millipede.cyclic.app/api/products/id

Delete One product requires user JWT
DELETE https://erin-thoughtful-millipede.cyclic.app/api/products/id

Get One Product requires user JWT
GET https://erin-thoughtful-millipede.cyclic.app/api/products/id

// Pedidos

ALL pedidos ADMIN JWT
GET https://erin-thoughtful-millipede.cyclic.app/api/pedidos/admin

One Pedido requieres user JWT:
GET https://erin-thoughtful-millipede.cyclic.app/api/pedidos/id

New Pedido requires user JWT:
POST https://erin-thoughtful-millipede.cyclic.app/api/pedidos/

get Pedidos requires user JWT
GET https://erin-thoughtful-millipede.cyclic.app/api/pedidos/
