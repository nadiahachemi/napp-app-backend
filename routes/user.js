const multer             = require('multer');
const express            = require("express");
const bcrypt             = require("bcrypt");
const User               = require("../models/user-model.js");
const Product            = require("../models/products-models.js");
const upload             = require('../configs/multer');
const Routine            = require ('../models/routine-model.js')

const router = express.Router();



  router.post("/signup", (req, res, next) => {
    const { name, email, originalPassword} = req.body;//, pictureUrl
    // let { secureUrl} = `/uploads/${req.file.filename}`

  
    if (originalPassword === "" || originalPassword.match(/[0-9]/) === null) {
      // create an Error object for "next(err)"
      const err = new Error("Password can't be blank and must have a number");
      next(err);
      return;
    }
  
    // we are ready to save the user if we get this far
    const encryptedPassword = bcrypt.hashSync(originalPassword, 10);
  
    User.create({ name, email, encryptedPassword })//,pictureUrl
      .then((userDoc) => {
        // log the user in immediately after signing up
        req.logIn(userDoc, () => {
          // hide encryptedPassword before sending the JSON (it's a security risk)
          userDoc.encryptedPassword = undefined;
          res.json({ userDoc });
        });
      })
      .catch((err) => {
        next(err);
      });
  })

  // router.post('/signup', upload.single('file'), function(req, res) {
  //   const user = new User({
  //     name: req.body.name,
  //     email: req.body.email,
  //     originalPassword: req.body.originalPassword,
  //     pictureUrl: `/uploads/${req.file.filename}`,
  //   });
  
  //   user.save((err) => {
  //     if (err) {
  //       return res.send(err);
  //     }
  
  //     return res.json({
  //       message: 'New user created!',
  //       user: user
  //     });
  //   });
  // });


  router.post("/login", (req, res, next) => {
    const { email, loginPassword } = req.body;
  
    // check the email by searching the database
    User.findOne({ email })
      .then((userDoc) => {
        if (!userDoc) {
          // create an Error object for "next(err)"
          const err = new Error("Email not found");
          next(err);
          return;
        }
  
        // we are ready to check the password if we get this far
        const { encryptedPassword } = userDoc;
        if (!bcrypt.compareSync(loginPassword, encryptedPassword)) {
          const err = new Error("Wrong password");
          next(err);
          return;
        }

          // we are ready to LOG THEM IN if we get this far
      req.logIn(userDoc, () => {
        // hide encryptedPassword before sending the JSON (it's a security risk)
        userDoc.encryptedPassword = undefined;
        res.json({ userDoc });
      });
    })
    .catch((err) => {
      next(err);
    });
});
   

router.delete("/logout", (req, res, next) => {
    req.logOut();
    res.json({ userDoc: null });
  });
  
  router.get("/checklogin", (req, res, next) => {
    if (req.user) {
      // hide encryptedPassword before sending the JSON (it's a security risk)
      req.user.encryptedPassword = undefined;
    }
    res.json({ userDoc: req.user });
  });



router.post("/curls-infos", (req, res, next) => {
  console.log("hello")
    let { id } = req.user;
    const { hairType, hairLength,  hairVolume, hairMoisture } = req.body;
  
    User.findByIdAndUpdate(
      id,
      { $set: {  hairType, hairLength, hairVolume, hairMoisture } },
      // "new" gets us the updated version of the document
      { runValidators: true, new: true }
    )
    .then((userDoc) => {
      res.json(userDoc);
    })
    .catch((err) => {
      next(err);
    });
  });

router.get("/wish-list", (req, res, next)=>{
  let { id } = req.user;
  User.findById(id)
  .populate("wishList")
  .then(userDoc => {
    res.locals.UserItem = userDoc
    res.json(userDoc);
  })
  .catch((err) => {
    next(err);
  });
});

router.get("/wish-list/search", (req, res, next)=>{
  const hairType = req.user.hairType;
  const {searchTerm} =req.body;

  if (searchTerm) {
    var query = { goodFor: hairType, type: searchTerm };
  }
  else {

    var query = { goodFor: hairType };
   
  }
  Product.find(query)
  .then(resultProduct=>{
    res.json(resultProduct)
  })
  .catch((err) => {
    next(err);
  });
});

router.post("/wish-list/add", (req, res, next)=>{
  let id = req.user._id;

  User.findByIdAndUpdate(
    id,
    {$push: { wishList: req.body.oneProduct._id}},
    { new: true }
  )
  .populate("wishList")
  .then(resultUser=>{
    resultUser.encryptedPassword = undefined;
    res.json(resultUser)
  })
  .catch((err)=>{
    next(err);
  });
})

router.post("/wish-list/pull", (req, res, next)=>{
  let id = req.user._id;
  console.log(req.body.oneWish)
  User.findByIdAndUpdate(
    id,
    {$pull: { wishList: req.body.oneWish._id}},
    { new: true }
  )
  .populate("wishList")
  .then(resultUser=>{
    resultUser.encryptedPassword = undefined;
    res.json(resultUser)
  })
  .catch((err)=>{
    next(err);
  });
})


router.get("/routines", (req, res, next)=>{
  Routine.find()
  .then((resultRoutine)=>{
    res.json(resultRoutine)})
    .catch((err) => {
      next(err);
    });
  });


router.get("/user-routines", (req, res, next)=>{
  const { id } = req.user;
  User.findById(id)
  .populate("routines")
  .then(userDoc => {
    res.locals.UserItem = userDoc
    res.json(userDoc);
  })
  .catch((err) => {
    next(err);
  });
});

router.post("/routines/add", (req, res, next)=>{
  let id = req.user._id;

  User.findByIdAndUpdate(
    id,
    {$push: { routines: req.body.oneRoutine._id}},
    { new: true }
  )
  .populate("routines")
  .then(resultUser=>{
    resultUser.encryptedPassword = undefined;
    res.json(resultUser)
  })
  .catch((err)=>{
    next(err);
  });
})

router.post("/routines/pull", (req, res, next)=>{
  let id = req.user._id;
  User.findByIdAndUpdate(
    id,
    {$pull: { routines: req.body.oneRoutine._id}},
    { new: true }
  )
  .populate("wishList")
  .then(resultUser=>{
    resultUser.encryptedPassword = undefined;
    res.json(resultUser)
  })
  .catch((err)=>{
    next(err);
  });
})


module.exports= router;