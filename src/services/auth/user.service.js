import User from '../../models/auth/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


export const generateToken=(id,role)=>{
    return jwt.sign({id,role},process.env.JWT_SECRET,{expiresIn:'1d'});
}

//register user
export const registerUser=async({name,email,password,role})=>{
    const userExists=await User.findOne({email});
    if(userExists) throw new Error('User already exists');

    const user=await User.create({name,email,password,role});
    return{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        token:generateToken(user._id,user.role)

    }
}

//login user
export const loginUser=async({email,password})=>{
    const user=await User.findOne({email});
    if(!user) throw new Error ('Invalid credentials');

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch) throw new Error('Invalid credentials');
    return{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        token:generateToken(user._id,user.role)
    }
}