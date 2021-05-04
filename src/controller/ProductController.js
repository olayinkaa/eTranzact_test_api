const Product = require('../model/Product.js');
const ProductService = require('../service/product.service')

const productController = {
    getAllProducts: async (req,res)=>{
        try {
            const products = await Product.find({})
                                    .select('-__v')
                                    .populate('user','-password -__v -date')
                                    .populate('category','-__v')
            if(!products) return res.status(404).json({error:"products not found"});
            return res.status(200).json({
                status:200,
                message:"successfully processed",
                data:products
            });
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    getProductById: async (req,res) => {
        try {
            const product = await Product.findById(req.params.productId)
                                        .select('-__v')
                                        .populate('user','-password -__v -date')
                                        .populate('category','-__v');
            if(!product) return res.status(404).json({error:"products not found"});
            return res.status(200).json({
                status:200,
                message:"successfully processed",
                data:product
            })
        } catch (error) {
            if (error.kind == 'ObjectId') {
                return res.status(400).json({ error: 'Invalid product ID' });
            }
            return res.status(500).send(error);
        }
    },
    addProduct: async (req,res) => {
        try {
            const { value, error } = ProductService.validateRequestBody(req.body);
            if(error) return res.status(400).json({error});
            const newValue = {
                ...value,
                user:req.user.id
            }
            let product = new Product(newValue);
            product = await product.save();
            if(!product) return res.status(400).json({error:"Unable to create user"})
            return res.status(200).json({
                status:200,
                message:"successfully processed",
                data:product
            });
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

module.exports = productController;