import mongoose from 'mongoose';

const PlantSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    }
})


const Plant=mongoose.model('Plant',PlantSchema);
export default Plant;