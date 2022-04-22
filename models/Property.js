const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertyschema = new Schema({
    email:{
        type:String,
        required:true
    },
    purpose : {
        type: String,
        required: true
    },
    property_category : {
        type: String,
        required: true
    },
    
    city:{
        type:String,
        required:true
    },
    apart:{
        type:String,
        required:true
    },
    locality:{
        type:String,
        required:true
    },
    subloc:{
        type:String,
        
    },
    houseno:{
        type:String,
       
    },
    
    no_of_bedrooms : {
        type: Number,
    },
    no_of_bathrooms : {
        type: Number,
    },
    no_of_floors : {
        type: Number,
    },
    area_of_property : {
        type: Number,
    },
    area_unit:{
        type:String
    },
    availabiltiy_status : {
        type: String,
    },
    img:
    {
        data: Buffer,
        contentType: String
    },
    property_price : {
        type: Number,
    },
    owwner_name : {
        type: String,
    },
    owner_contact_no : {
        type: Number,
    },
    property_age:{
        type: Number,
    },
    abt_property:{
        type: String,
    }
});

const Property = new mongoose.model('property', propertyschema);
module.exports = Property;