require('dotenv').config();

const mongoose = require("mongoose");
const User = require("../models/user-model.js");
const Product = require("../models/products-models.js");
const Routine= require("../models/routine-model.js");





mongoose.Promise = Promise;
mongoose
    .connect(process.env.MONGODB_URI, { useMongoClient: true })
    .then(() => {
        console.log('Connected to Mongo!')
    }).catch(err => {
        console.error('Error connecting to mongo', err)
    });


    routineData.forEach((oneRoutine)=>{
      Routine.create(oneRoutine)
       .then((routineDoc) => {
        console.log(`Created ${routineDoc} in the database`);
    })
    .catch((err) => {
        console.log('Create routine Fail 💩', err)
    });
 })