const Product = require('../model/Product.js');
const ProductService = require('../service/product.service')

class APIfeatures {
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString
    }
    filtering(){
        const queryobj = {...this.queryString};
        const excludedfields = ['page','sort','limit',"bestSeller"];
        excludedfields.forEach(el=>delete queryobj[el]); // DELETE from querystring
        let querystr = JSON.stringify(queryobj);
        querystr = querystr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);
        this.query.find(JSON.parse(querystr))
        return this;
    }
    sorting(){
        if(this.queryString.sort){
            const sortby = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortby);
        } else {
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }
    paginating(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || this.query.length;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

const productController = {
    getAllProducts: async (req,res)=>{
        try {
            const features = new APIfeatures(Product.find({user:req.user.id}),req.query)
                                            .filtering()
                                            .sorting()
                                            .paginating();
            const products = await features.query
                                    .select('-__v')
                                    .populate('category','-__v')
                                    .populate('user','-password -__v -date')
            // const products = await Product.find({user:req.user.id})
            //                         .select('-__v')
                                    // .populate('user','-password -__v -date')
                                    // .populate('category','-__v')
            if(!products) return res.status(404).json({error:"products not found"});
            return res.status(200).json({
                status:200,
                message:"successfully processed",
                data:products,
                totalElements:products.length,
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
            if(error) return res.status(400).json(Object.assign({},...(error.details.map(item=>({[item.path[0]]:item.message})))))
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
    },
    updateProductCategory: async (req,res) => {
        try {
            const {productId} = req.params;
            let product = await Product.findById(productId)
            const { value, error } = ProductService.validateRequestBody(req.body);
            if(error) return res.status(400).json({error});
            const newValue = {
                ...value,
                user:req.user.id
            }
            console.log(product)
            if((product.user).toString()!==req.user.id) return res.status(403).json({error:"You are not authorize."})
            product = await Product.findOneAndUpdate(
                {_id:productId},
                newValue,
                {new:true}
                )
            if(!product) return res.status(400).json({error:"Could not find product"})
            return res.status(200).json({
                status:200,
                message:"successfully processed",
                data:product
            })

        } catch (error) {
            console.log(error)
            return res.status(500).send(error);
        }
    },
    removeProductById: async (req,res)=> {
        try {
            const { productId } = req.params;
            let product = await Product.findById(productId)
            if((product.user).toString()!==req.user.id) return res.status(403).json({error:"You are not authorize."})
            product = await Product.findOneAndRemove({ _id: productId });
            if (!product) {
              return res.status(404).json({ err: 'could not find product' });
            }
            return res.json({message:"Product successfully deleted"});
          } catch (error) {
            console.error(error);
            if (error.kind == 'ObjectId') {
                return res.status(400).json({ error: 'Invalid product ID' });
            }
            return res.status(500).send(error);
        }
    }
}

module.exports = productController;