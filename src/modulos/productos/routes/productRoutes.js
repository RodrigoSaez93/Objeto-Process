const express = require("express");
const ProductosCtrl = require("../controlador/ProductosCtrl");

const productosCtrl = new ProductosCtrl();

const router = express.Router();

router.get("/productos", async (req, res) => {
    await productosCtrl.listar(req, res);
});

router.get("/productos/:id", async (req, res) => {
    await productosCtrl.listarPorId(req, res);
});

router.post("/productos", async (req, res) => {
    await productosCtrl.insertar(req, res);
});

router.put("/productos/:id", async (req, res) => {
    await productosCtrl.actualizar(req, res);
});

router.delete("/productos/:id", async (req, res) => {
    await productosCtrl.eliminar(req, res);
});

module.exports = router;