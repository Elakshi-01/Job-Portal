import mongoose, { Schema } from "mongoose";



const companySchema = new Schema(
    {
        name : {
            type : String,
            required : true,
            unique : true
        },

        
        description: {
            type : String,
        },

        
        location : {
            type : String,
        },

        
        website: {
            type : String,
        },

        
        logo : {
            type : String, // url to company logo
        },

        userId :{
            type : mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required : true
        },
    }
    ,

    { timestamps: true });



export const Company = mongoose.model("Company", companySchema);