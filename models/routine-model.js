const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const routineSchema = new Schema({
    name:{ type: String, required: true },
    description: {type: String, minlength: 8},
    pictureUrl: {type:String},
    video:{type:String}
})

const Routine = mongoose.model("Routine", routineSchema);


module.exports = Routine;