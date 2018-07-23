const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const productSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: {type: String, minlength: 8},
  type: {type: String, enum :["shampoo", "conditioner", "masque", "oil", "gel", "hair spray", "scalp treatment", "mousse"]},
  goodFor: [{type:String, enum:["1","2a","2b","2c","3a","3b","3c","4a","4b","4c"]}],
  pictureUrl: {type:String}
  }
, {
  timestamps: true
});

const Product = mongoose.model("Product", productSchema);


module.exports = Product;
