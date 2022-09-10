var express = require('express');
let _ = require('lodash');
var router = express.Router();
var memberData = require("../models/Member.js");

/* POST - Add Member */
router.post('/add', async(req,res) => {
    console.log("add");
//   let admin = new adminData(_.pick(req.body, ['name','email','password']));

//   try{
//     //Check if emailID is already registered
//     const adminExists = await adminData.findOne({email : admin.email});
//     if(adminExists)
//       return res.status(400).send({code: 1, message: 'EMail ID is already registered'});
    
//     //Attempt to save to adminSchema
//     const createAdmin = await admin.save();
//     res.status(200).json({code : 0, message : "Successfully added admin data"});  
//   } catch(err){
//     res.status(400);
//     err.code === 11000 ? 
//       res.json({code: 1, message: 'Duplicate Entry', error: err}) : 
//         res.json({code: 2, message: 'Error occurred while adding admin details', error: err});
//   }
});

router.get('/get', async(req, res) => {
    const data = await memberData.findById("631ca6002560db90fdcbec33");
    res.json(data);
});

module.exports = router;