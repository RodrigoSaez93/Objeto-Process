const request = require('supertest')('http://localhost:8080')
const expect = require('chai').expect
const faker = require('faker')
describe('test de integración de productos', function () {
    it('debería insertar un producto', async function () {
        const producto = {
            title: faker.commerce.productName(), 
            price: 80,
            thumbnail: faker.image.food()
        }
 
        let response = await request.post('/api/productos/guardar').send(producto)
        expect(response.status).to.eql(200)
 
        const productoResp = response.body
        expect(productoResp).to.include.keys( 'title', 'price', 'thumbnail')
        expect(productoResp.title).to.eql(producto.title)
        expect(productoResp.price).to.eql(producto.price)
        expect(productoResp.thumbnail).to.eql(producto.thumbnail)
    })
 
    it('deberia listar los productos', async function () {
        let response = await request.get('/api/productos/listar')
        let productos = response.body
        expect(response.status).to.eql(200)
        expect(productos.length).to.greaterThan(0)
    })
 
    it('deberia cargar un producto', async function() {
        let response = await request.get('/api/productos/listar/619d6618e3327d1b59a1b8a8')
        expect(response.status).to.eql(200)
        const productoResp = response.body
        expect(productoResp).to.include.keys('_id', 'title', 'price', 'thumbnail')
    })
 
    it('deberia actualizar un producto', async function () {
        const producto = {
            title: faker.commerce.productName(), 
            price: 80,
            thumnail: faker.image.food()
        }
 
        let response = await request.put('/api/productos/actualizar/619d6618e3327d1b59a1b8a8').send(producto)
        expect(response.status).to.eql(200)
        const productoResp = response.body
        expect(productoResp).to.include.keys('title', 'price', 'thumbnail')
        expect(productoResp.title).to.eql(producto.title)
        expect(productoResp.price).to.eql(producto.price)
        expect(productoResp.thumbnail).to.eql(producto.thumbnail)
    })
 
    it('deberia eliminar un producto', async function() {
        let response = await request.delete('/api/productos/eliminar/619d6618e3327d1b59a1b8a8')
        expect(response.status).to.eql(200)
        const productoResp = response.body
        expect(productoResp).to.include.keys('title', 'price', 'thumbnail')
    })
})