let instance=null
const mensajes=[]
const PersistenciaChat=require('./persistenciaChat')
class PersistenciaChatMemoria extends PersistenciaChat{


    obtenerMensajes(){

        return mensajes
    }

    insertarMensaje(mensaje){

        mensajes.push(mensaje)
        return Promise.resolve(mensaje)
    }

    static getInstance(){
        if (instance===null){
            instance=new PersistenciaChatMemoria()
        }
        return instance
    }
}

 module.exports=PersistenciaChatMemoria