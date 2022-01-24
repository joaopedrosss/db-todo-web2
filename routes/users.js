const express = require("express")
const res = require("express/lib/response")
const router = express.Router()
const User = require("../models/user")


module.exports = router

//Consultar todos*
router.get('/',async(req,res) => {
    try{
        const usuarios = await User.find();
        res.json(usuarios)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//Consultar um usuario*
router.get('/:id',getUser,(req,res) => {
    res.json(res.usuario)
})

//Criar um usuario*
router.post('/',async(req,res) => {
    const usuario = new User({
        email: req.body.email,
        senha: req.body.senha
    })
    try{
        const novoUser = await usuario.save();
        res.status(201).json(novoUser)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})


async function getUser(req,res,next){
    let usuario
    try{
        usuario = await User.findById(req.params.id)
        if(usuario == null){
            return res.status(404).json({message:"Not found"})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.usuario = usuario
    next()
}
