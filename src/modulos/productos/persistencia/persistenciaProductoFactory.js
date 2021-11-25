const obtenerArgs=require('../../../utils/obtenerArgs')
const persistenciaProductoMongo= require('./PersistenciaProductoMongo')
const persistenciaProductoMemoria=require('./persistenciaProductoMemoria')
class persistenciaProductoFactory {

        crearPersistencia(){
            const {persistencia} = obtenerArgs()

            switch(persistencia){
                case 'mongo':
                    return persistenciaProductoMongo.getInstance()

                case'memoria' :
                return persistenciaProductoMemoria.getInstance()

                default : 
                return persistenciaProductoMongo.getInstance()
            }

            
        }

}

module.exports=persistenciaProductoFactory