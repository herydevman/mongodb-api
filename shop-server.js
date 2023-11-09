const mongoose = require ('mongoose')
mongoose.set('strictQuery', false)
require("dotenv").config()

async function beginConnection(){
    try{
        await mongoose.connect("mongodb+srv://shop:*totona*@cluster0.nivnvue.mongodb.net/?retryWrites=true&w=majority", {
            dbName: "shopDb",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`connexion réussie `)
        app.listen(process.env.PORT || 3000)
    }
    catch(e){
        console.log(e)
    }
}


// mongodb+srv://shop:<totonabesla>@cluster0.nivnvue.mongodb.net/?retryWrites=true&w=majority
const express = require('express')
const authMiddleware = require('./jwtService/jwtAuthentication')
const app = express()
const cors = require("cors")
const bodyParser = require('body-parser')
const fs = require('fs-extra')

app.use(cors())
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        let path ='/uploads'
        
        fs.mkdirsSync(path);
        cb(null, path);
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage})




app.post('/upload', upload.any(), function
(req, res, next) {
    console.log(req.body)
 res.send()
})
// -------USERS----------

const userController = require("./controller/UserController")
app.route("/api/users")
    .get(userController.all)
    .post(bodyParser.json(), userController.saveUser)
app.get("/api/users/:id", authMiddleware, userController.findOne)
app.put("/api/users/saveStatus/:id", bodyParser.json(), userController.saveStatus)
app.delete("/api/users/:id", authMiddleware, userController.deleteUser)
app.post("/api/users/authentification", bodyParser.json(), userController.authenficate)
app.put("/api/users/update/:id", authMiddleware, bodyParser.json(), userController.updateUser)
// --------PRODUCTS-----------

const productController = require("./controller/ProductController")
app.route("/api/products")
    .get(productController.all)
    .post(bodyParser.json(), productController.saveProducts)
app.put("/api/modifProducts/:id", bodyParser.json(), productController.modifProduct)
app.delete("/api/deleteProducts/:id", productController.deleteProduct)

// --------------- COMMAND --------------

const commandController = require('./controller/CommandController')
app.route("/api/allcommands")
    .get(commandController.all)
    .post(bodyParser.json(), commandController.saveCommand)
app.get("/allcommands/:id", commandController.findOne)

// --------------- CONTACT --------------
const Contacts = require('./contact/contact')
app.post("/saveContact", bodyParser.json(), async(req, res)=>{
    const contact = new Contacts(req.body)
    await contact.save()
    const result = await Contacts.find({}).lean()
    res.send(result)
})
app.get("/allcontacts", async(req, res)=>{
    const result = await Contacts.find({})
    res.send(result)
})
app.post("/postbody", bodyParser.json(), (req, res)=>{
    console.log(req.body)
    res.send(req.body)
})

// -------- ACTIVITY ----------- ///
const Activities = require("./controller/ActivityController")
app.route("/activities")
    .get(Activities.all)
    .post(bodyParser.json(), Activities.create)

beginConnection()