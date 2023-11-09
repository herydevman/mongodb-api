const mongoose = require("mongoose")
const Commands = require("../card/command")
const Users = require("../shop-users/users")

const commandController = {
    all: async(req, res)=>{
        const result = await Commands.find({})
        res.send(result)
    },
    findOne: async(req, res)=>{
        const resultat = await Commands.findOne({_id: req.params.id}).populate("user")
        res.send(resultat)
    },
    saveCommand: async(req, res)=>{
        const command = new Commands({
            user: mongoose.Types.ObjectId(req.body.users),
            products: req.body.products,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt,
            payed: req.body.payed,
            clientRemark: req.body.clientRemark
        })
        console.log(req.body)
        const resultat = await command.save()
        const updatedUser = await Users.findByIdAndUpdate(req.body.users, {
            $push:{
                command: command._id
            }
        })
        res.send([resultat, updatedUser])
    }
}
module.exports = commandController