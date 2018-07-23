const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("../models/products-models.js");


const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^.+@.+\..+$/
  },
  encryptedPassword: { type: String, required: true },
  hairType: {type:String, enum:["1","2a","2b","2c","3a","3b","3c","4a","4b","4c"]},
  hairLength: {type:Number, max: 100, min:0},
  hairVolume: {type:String, enum:["extra thin", "thin", "normal", "thick", "extra thick"]},
  hairMoisture: {type: String, enum:["extra dry", "dry", "normal", "greassy", "extra greassy"]},
  pictureUrl:{type:String},
  wishList:[{type:Schema.ObjectId, ref: 'Product' }]
  }
, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);


module.exports = User;
