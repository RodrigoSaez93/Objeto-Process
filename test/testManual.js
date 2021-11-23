const axios = require('axios').default;
const url = "http://localhost:8080/api"
// insertar producto 
 
async function doTest() {
    console.log("Test manuales.")
    console.log("Testeando el insert")
    const producto = {
        title: 'Alfajor',
        price: 100,
        thumbnail: 'https://www.google.com.ar/sample.png'
    }
    let response = await axios.post(`${url}/productos/guardar`, producto)
    console.log("La respuesta fue")
    console.log(response)
 
    console.log("Testeando el listar")
    response = await axios.get(`${url}/productos/listar`)
    console.log("La respuesta fue")
    console.log(response)
 
    console.log("Testeando el cargar un producto")
    response = await axios.get(`${url}/productos/listar/619d6618e3327d1b59a1b8a8`)
    console.log("La respuesta fue")
    console.log(response)
 
    console.log("Testeando el actualizar un producto")
    producto.title = 'Alfajor triple'
    response = await axios.put(`${url}/productos/actualizar/619d6618e3327d1b59a1b8a8`, producto)
    console.log("La respuesta fue")
    console.log(response)
 
    console.log("Testeando el eliminar un producto.")
    response = await axios.delete(`${url}/productos/eliminar/619d6618e3327d1b59a1b8a8`)
    console.log("La respuesta fue")
    console.log(response)
}  
 
 
doTest();