const express=require("express")
const router=express.Router()
const {buildSchema}=require('graphql')
const {graphqlHTTP}=require('express-graphql')

const productoModel =require('./valProducto')

const schema=buildSchema( `

   type Query {

    producto: Product,
    productos: [Product]
   }     

   type Mutation {

    insertarProducto(title:String,price:Float!,thumbnail:String):Product

   }
   type Product {
       title:String,
       price:Float,
       thumbnail:String
   }
  `)

  const getProducto = function(args) {
    const id = arg.id;
    return productoModel.findById(id).exec();
}

const getProductos = function() {
    return productoModel.find().exec();
}

const crearProducto = function({title, price, thumbnail}) {
    const nuevo = new productoModel({title, price, thumbnail})
    nuevo.save()
    return nuevo
}

const root = {
    producto:getProducto,
    productos:getProductos,
    insertarProducto:crearProducto
}

router.use('/graphql',graphqlHTTP({
    schema:schema,
    rootValue:root,
    graphiql:true

}))

module.exports=router
