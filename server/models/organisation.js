const mongoose = require('mongoose');
const crypto = require('crypto');

const organisationSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    rating:{
        type:Number
    },
    number:{
        type:Number
    },
    location:{
        type:Array
    },
    description:{
        type:String
    },
    social:{
        type:String
    },
    address:{
        type:String
    },
    gmap:{
        type:String
    },
    website:{
        type:String
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true
    },

}, { timestamps: true})




module.exports = mongoose.model('Organisation', organisationSchema);