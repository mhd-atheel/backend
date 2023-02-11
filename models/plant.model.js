import mongoose from "mongoose";

const plantSchema = mongoose.Schema({

    plantName : {
        type : String,
        required : true
    },
    plantDescription : {
        type : String,
        required : true
    },
    plantPrice : {
        type : Number,
        required : true
    },
    plantImages : {
        type: String,
        required : true,
    }
},{
    timestamps:true
})

const Plant = mongoose.model('plants', plantSchema);

export default Plant;
