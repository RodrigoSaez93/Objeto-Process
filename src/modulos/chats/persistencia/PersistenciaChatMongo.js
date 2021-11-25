const chatModel=require('./chat')
let instance=null
const PersistenciaChat=require('./persistenciaChat')
class PersistenciaChatMongo extends PersistenciaChat {
    

     obtenerMensajes() {
      return chatModel.find();
    }

     async insertarMensaje(mensaje) {
        const chatNuevo = new chatModel(mensaje)

        
      return  await chatNuevo.save()


    }
    static getInstance(){
      if (instance===null){
          instance=new PersistenciaChatMongo()
      }
      return instance
  }
}

module.exports = PersistenciaChatMongo;