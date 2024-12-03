var rutas = require("express").Router();
// var {Router} = require("express");
var {mostrarUsuarios, nuevoUsuario, borrarUsuario, buscarPorID} = require("../bd/usuariosBD");

rutas.get("/mostrarUsuarioss", async (req,res)=>{
    // res.send("Hola estás en raiz");
    var usuariosValidos= await mostrarUsuarios();   
    // console.log(usuariosValidos);
    res.json(usuariosValidos);
    
});

rutas.get("/buscarPorId/:id", async (req, res) => {
    try {
        const usuarioValido = await buscarPorID(req.params.id);
        if (usuarioValido) {
            res.status(200).json({
                mensaje: "Usuario encontrado",
                datos: usuarioValido
            });
        } else {
            res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: "Ocurrió un error al buscar el usuario",
            error: error.message
        });
    }
});


rutas.delete("/borrarUsuario/:id", async (req, res) => {
    try {
        const usuarioBorrado = await borrarUsuario(req.params.id);
        if (usuarioBorrado) {
            res.status(200).json({
                mensaje: "Usuario borrado",
                datos: usuarioBorrado
            });
        } else {
            res.status(404).json({
                mensaje: "Usuario borrado"
            });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: "Usuario borrado",
            error: error.message
        });
    }
});

rutas.post("/nuevoUsuario", async (req, res)=>{
    var usuarioValido = await nuevoUsuario(req.body);
    res.json(usuarioValido);
});

module.exports=rutas;
