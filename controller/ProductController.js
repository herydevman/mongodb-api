const Products = require("../products/products")

const productController = {
    all: async(req, res)=>{
        const result = await Products.find({}).lean()
        res.send(result)
    },
    saveProducts:  async(req, res)=>{
        const product = new Products(req.body)
        await product.save()
        const result = await Products.find({}).lean()
        res.send(result)
    },
    modifProduct: async(req, res)=>{
        const result = await Products.findById({_id:req.params.id})
        if(result != undefined || result != null){
            await result.updateOne({$set:{
                name: req.body.name,
                categorie: req.body.categorie,
                description: req.body.description,
                image: req.body.image,
                discount: req.body.discount,
                price: req.body.price,
                num: req.body.num
            }})
            res.send(result)
        }
    },
    deleteProduct: async (req, res)=>{
        const r = await Products.findByIdAndDelete(req.params.id)
        const result = await Products.find({}).lean()
        console.log(r)
        res.send(result)
    }
}
module.exports = productController