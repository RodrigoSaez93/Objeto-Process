const chatModel=require('./chat')

class chatRepository  {
         insertar(chat){
            const chatNuevo= new chatModel(chat)
            return chatNuevo.save()
         }
        
         listar(){
            return chatModel.find()
         }


}

module.exports=chatRepository