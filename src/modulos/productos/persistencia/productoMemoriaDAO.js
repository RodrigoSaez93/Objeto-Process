let productos=[]
const PersistenciaProducto=require('./persistenciaProducto')
let instance=null
class PersistenciaProductoMemoria extends PersistenciaProducto  {

    insertar(producto)  {
       
       productos.push(producto)
       return Promise.resolve(producto)
   }

     buscar(id) {

        const producto =productos.find(prod => prod.id=id)

          return Promise.resolve(producto)
   }

     listar() {

       return Promise.resolve(productos)
   }

     actualizar(producto) {

        const productoAnterior =productos.find(prod => prod.id=id)
        Object.assign(productoAnterior,producto)
       return  Promise.resolve(producto)
   }

    eliminar(id) {
        const producto =productos.find(prod => prod.id=id)
        const index=productos.indexOf(producto)
         productos.splice(index,1)

       return   Promise.resolve(producto)
   }

   static getInstance(){
    if (instance===null){
        instance=new PersistenciaProductoMemoria()
    }
    return instance
}
}