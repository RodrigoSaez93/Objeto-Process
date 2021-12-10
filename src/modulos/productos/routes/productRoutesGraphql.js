const express=require("express")
const router=express.Router()
const {graphqlHTTP}=require('express-graphql')

router.use('/graphql',graphqlHTTP({
    schema:schema,
    rootValue:root,
    graphiql:true

})) 

module.exports=router