import {  newPlant } from "../../services/plant/plant.service.js";

export const createPlant=async(req,res)=>{
    try{
    const Plant=await newPlant({...req.body});
    return res.status(200).json({data:Plant,message:'Plant created successfully'})
    }catch(error){
        return res.status(400).json({message:error.message})
    }
}