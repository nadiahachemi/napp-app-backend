const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const routineSchema = new Schema({
    name:{ type: String, required: true },
    when:{type: String, enum:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]},
    description: {type: String, minlength: 8},
    pictureUrl: {type:String},
    video:{type:String}
})

const Routine = mongoose.model("Routine", routineSchema);


module.exports = Routine;