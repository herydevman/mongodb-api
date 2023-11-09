const Users = require("../shop-users/users")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
require("dotenv").config()

const { findOneAndUpdate } = require("../shop-users/users")

const userController = {
    all: async(req, res)=>{
        const result = await Users.find({})
        res.send(result)
    },
    findOne: async(req, res)=>{
        const resultat = await Users.findOne({_id: req.params.id}).populate("command")
        res.send(resultat)
    },
    saveUser: async(req, res)=>{
        const user = new Users(req.body)
        if (user){
            let saltRounds = 10
            let hashed = await bcrypt.hash(user.password, saltRounds);
            user.password = hashed
            await user.save()
            const allUsers = await Users.find({})
            res.send(allUsers)
        }
    },
    saveStatus: async(req, res)=>{
        console.log(req.params)
        console.log(req.body)
        const result = await Users.findByIdAndUpdate({_id:req.params.id}, {$set:{
            isLogged : req.body.isLogged
        }})
        res.send(result)
    },
    authenficate: async(req, res)=>{
        const userAuth = await Users.findOne({email: req.body.email})
        if(userAuth != null && userAuth != undefined){
            const token = jwt.sign(JSON.stringify(userAuth) ,  process.env.SECRET)
            const passMatch = await bcrypt.compare(req.body.password, userAuth.password)
            if(passMatch == true){
                userAuth.isLogged = true
                await userAuth.save()
                res.json({
                    user: userAuth,
                    token: token
                })
            }else{
                res.json("wrong password")
            }
        }else{
            res.json("invalid email")
        }
        },
    updateUser: async(req, res)=>{
        const userToModified = await Users.findById(req.params.id)
        if(userToModified != null && userToModified != undefined){

        }
        userToModified.name = req.body.name;
        userToModified.lastname = req.body.lastname;
        userToModified.email = req.body.email;
        
        let saltRounds = 10
        let hashed = await bcrypt.hash(req.body.password, saltRounds);
        userToModified.password = hashed
        
        userToModified.payementWays = req.body.payementWays
        await userToModified.save()
        const allUsers = await Users.find({})
        res.json(allUsers)
    },
    deleteUser: async(req, res)=>{
        const userToDeleted = await Users.findById(req.params.id)
        if(userToDeleted != null && userToDeleted != undefined){
            await userToDeleted.delete()
            const allUsers = await Users.find({})
            res.json(allUsers)
        }
    }
        
}
module.exports = userController