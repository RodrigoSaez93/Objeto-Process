let id=0



const productoInfo = producto =>{
    
    return {
        fyh: new Date().toLocaleDateString(),
        title: producto.title,
        price: producto.price,
        thumbnail: producto.thumbnail,
        id: id++
    }

}   
module.exports={productoInfo}