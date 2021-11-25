const productoModel =require('./productoModel')
let instance=null
const PersistenciaProducto=require('./persistenciaProducto')

class PersistenciaProductoMongo extends PersistenciaProducto {
    
        
   async insertar(producto) {
        
        const productoNuevo= new productoModel(producto)
        return await productoNuevo.save()
    }

     async buscar(id) {
           return await productoModel.findById(id).exec()
    }

     async listar() {
        return await productoModel.find({});
    }

     async actualizar(producto) {
        return await productoModel.updateOne({_id:producto._id},producto)
    }

    async eliminar(id) {
        return await  productoModel.deleteOne({_id:id})
    }
    static getInstance(){
        if (instance===null){
            instance=new PersistenciaProductoMongo()
        }
        return instance
    }
}

module.exports = PersistenciaProductoMongo;