import Category from '../model/Category.js';
import CategoryService from '../service/category.service.js';

const categoryController = {
    getAllCategory: async (req,res) => {
        try {
            const categories = await Category.find({}).select("name");
            if(!categories) return res.status(404).json({error:"categories not found"});
            return res.status(200).json({
                status:200,
                message:"successfully processed",
                data:categories
            })
        } catch (error) {
            console.log(error)
            return res.status(500).send(error);
        }
    },
    getCategoryById: async (req,res)=> {
       try {
        const category = await Category.findById(req.params.catId).select(['name']);
        if(!category) return res.status(404).json({error:"categories not found"});
        return res.status(200).json({
            status:200,
            message:"successfully processed",
            data:category
        })
       } catch (error) {
            console.log(error)
            if (error.kind == 'ObjectId') {
                return res.status(400).json({ error: 'Category not found' });
            }
            return res.status(500).send(error);
       }
    },
    addCategory : async (req,res) => {
        try {
            const { value, error } = CategoryService.validateRequestBody(req.body);
            if(error) return res.status(400).json({error})
            let category = new Category({
                name:value.name
            });
            category = await category.save();
            return res.status(200).json({
                status:200,
                message:"successfully processed",
                data:category
            });
        } catch (error) {
            console.log(error)
            return res.status(500).send(error);
        }
    },
    updateCategory: async (req,res) => {
       try {
            const {catId} = req.params
            const { value, error } = CategoryService.validateRequestBody(req.body);
            if(error) return res.status(400).json({error})
            const category = await Category.findOneAndUpdate({ _id: catId }, value, { new: true });
            return res.status(200).json({
                status:200,
                message:"successfully updated",
                data:category
            });
       } catch (error) {
        console.error(error);
            if (error.kind == 'ObjectId') {
                return res.status(400).json({ error: 'Invalid category ID' });
            }
            return res.status(500).send(error);
       }
    },
    removeCategoryById: async (req,res)=> {
        try {
            const { catId } = req.params;
            const category = await Category.findOneAndRemove({ _id: catId });
            if (!category) {
              return res.status(404).json({ err: 'could not find category' });
            }
            return res.json({message:"Category successfully deleted"});
          } catch (error) {
            console.error(error);
            if (error.kind == 'ObjectId') {
                return res.status(400).json({ error: 'Invalid category ID' });
            }
            return res.status(500).send(error);
        }
    }
}

export default categoryController;