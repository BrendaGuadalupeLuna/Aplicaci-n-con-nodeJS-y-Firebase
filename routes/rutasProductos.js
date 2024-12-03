var rutas = require("express").Router();
var {mostrarProductos,nuevoProducto,borrarProducto,buscarPorId} = require("../bd/productosBD");


rutas.get("/mostrarProductos",async (req,res) =>{
    //res.send("Hola etas en raiz");
    var producosValidos = await mostrarProductos();
    //console.log(usuarisValidos);
    res.json(producosValidos);
});

rutas.get("/buscarProductoPorId/:id", async(req,res) => {
    var producosValidos = await buscarPorId(req.params.id)
    //console.log (usuarioValido);
    res.json(producosValidos);
    
});

rutas.delete("/borrarProducto/:id", async (req, res) => {
    try {
        const productoBorrado = await borrarProducto(req.params.id);
        res.status(200).json(productoBorrado);
    } catch (error) {
        res.status(500).json({ error: "Error al borrar el producto" });
    }
});

rutas.post("/nuevoProducto", async (req,res) => {
    var productoValido = await nuevoProducto(req.body);
    console.log(productoValido);
    res.json(productoValido);
})


module.exports = rutas;
