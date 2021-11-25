const obtenerArgs=require('../../../utils/obtenerArgs')
const persistenciaChatMongo= require('./PersistenciaChatMongo')
const persistenciaChatMemoria=require('./persistenciaChatMemoria')
class persistenciaChatFactory {

        crearPersistencia(){
            const {persistencia} = obtenerArgs()

            switch(persistencia){
                case 'mongo':
                    return persistenciaChatMongo.getInstance()

                case'memoria' :
                return persistenciaChatMemoria.getInstance()

                default : 
                return persistenciaChatMongo.getInstance()
            }

            
        }

}

module.exports=persistenciaChatFactory