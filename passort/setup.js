const passport= require("passport");


const User = require("../models/user-model.js");

passport.serializeUser((userDoc, done)=>{
    console.log("SERELIZE (save to session)");

    //"null" in the first argument tells Passport "no errors occured"
    done(null, userDoc._id)
});

//deserilize: retrieving the rest of the user data from the database.
passport.deserializeUser((idFromSession, done)=>{
    console.log("deSERIALIZE ( user data from database");

    User.findById(idFromSession)
    .then((userDoc)=>{
        // "null" in the 1st argument tells Passport "no errors occured"
        done(null, userDoc)
    })
    .catch((err)=>{
        done(err);
    })
});

function passportSetup(app){
    //ad Passport properties $ methods to the "req" object in our routes 
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res,  next)=>{
    //makes "req.user" accessible inside hbs files as "blah user"
    res.locals.blahUser = req.user

    next();
});
}

module.exports= passportSetup;