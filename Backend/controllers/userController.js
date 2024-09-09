import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator'

//login user
const loginUser = async(req, res)=>{

    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success: false, message:"user Does not exist"})

        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false, message:"Invalid credentials"})
        }

        const token = createToken(user._id);
        const username = user.name;
        res.json({success:true, token,newUserName:username})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:"error"})
    }

}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res)=>{
    const {name, password, email} = req.body;
    try {
        //checking this is already exists
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({success:false,message:'User already exists'})
        }

        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:'Please enter valid email'})
        }

        if(password.length < 8){
            return res.json({success:false,message:'Please enter strong password'})
        }

        //hasing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);


        //new user
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user =  await newUser.save()
        console.log(user);
        const token = createToken(user._id)
        const newuser = user.name;
        res.json({success:true, token,newUserName:newuser});

    } catch (error) {
        
        console.log(error);
        res.json({success:false, message:'Error'})

    }

}

export {loginUser,registerUser}; 