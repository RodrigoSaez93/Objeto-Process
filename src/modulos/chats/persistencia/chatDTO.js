

const chatInfo = chat => {
   
   return {
       fyh : new Date().toLocaleDateString(),
        author:chat.author,
        date:chat.date,
        text:chat.text   
    
    }
    

}

module.exports={chatInfo}