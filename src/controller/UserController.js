const User = require('../model/User.js');
const UserService = require('../service/user.service.js');
const jwt = require('../helpers/jwt.js')

const userController = {
    getAllUsers: async (req,res)=>{
        try {
            const users = await User.find().select({
                password:0,
                __v:0,
                // contactInfo:{$name}
            });
            if(!users) return res.status(404).json({error:"categories not found"});
            return res.status(200).json({
                status:200,
                message:"successfully processed",
                data:users
            })
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    registerUser: async (req,res) => {
        try {
            const { value, error } = UserService.validateRequestBody(req.body);
            if(error) return res.status(400).json({error});
            const encryptedPass = await UserService.encryptPassword(value.password);
            const newValue = {
                ...value,
                password:encryptedPass
            }
            let user = await  User.findOne({email:value.email})
            if(user) return res.status(400).json({error:"email already taken"})
            user = new User(newValue);
            user = await user.save();
            if(!user) return res.status(400).json({error:"Unable to create user"})
            return res.status(200).json({
                status:200,
                message:"successfully processed",
                data:user
            });
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    login : async (req,res) => {
        try {
            const { value, error } = UserService.validateLogin(req.body);
            if (error) {
              return res.status(400).json(error);
            }
            const user = await User.findOne({ email: value.email });
            if (!user) {
              return res.status(401).json({ error: 'unauthorized' });
            }
            const authenticated = UserService.comparePassword(value.password, user.password);
            if (!authenticated) {
              return res.status(401).json({ error: 'unauthorized' });
            }

            const payload = { 
                id: user._id,
                name:user.name,
                email:user.email,
                gender:user.gender,
                username:user.username,
                contactInfo:user.contactInfo
            }
            const token = jwt.issue(payload, '1d'); // 1 day
            return res.status(200).json({ 
                success:true,
                token
            });
          } catch (error) {
            return res.status(500).send(error);
        }
   
    },
    getAuthUser: async (req,res)=> {
        try {
            const user = await User.findById(req.user.id).select('-password -__v');
            // if(!user) return res.status(404).json({error:"User not found"});/
            return res.status(200).json({
                status:200,
                message:"successfully processed",
                data:user
            })
        } catch (error) {
            console.error(error);
            return res.status(500).send(error);
        }

    }
}

module.exports = userController;