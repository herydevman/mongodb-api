const jwt = require('jsonwebtoken')
require("dotenv").config()

function authMiddleware(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.SECRET, (err, data)=>{
        if(err) return res.sendStatus(403)
        next()
    })
}
module.exports = authMiddleware