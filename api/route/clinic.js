const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Clinic = require('../models/clinic');
const _ = require('lodash');
const upload = require('../config/multer');
const ClinicController = require('../controllers/clinic');
router.get('/',(req,res) => {
    Clinic.find().then(doc => {
        res.status(200).send({all: doc})
    }).catch(err => {res.status(404).send({err:err})})
})
//create new clinic
router.post('/',upload.array('imageUrls', 8), ClinicController.create_new_clinic);
//follow a clinic by idClinic and need current userID in body
router.post('/follow/:idClinic', (req,res) => {
    const idClinic = req.params.idClinic;
    const idUser = req.body._idUser;
    User.findById(idUser, (err,result)=> {
        console.log(result.follows[1])
        console.log(result.follows.length)
        for(var i = 0; i< result.follows.length; i++) {
            if(String(result.follows[i]) === String(idClinic)) 
                return res.status(400).json({error:"followed"})
        }
       
            Clinic.update({_id:idClinic}, {$inc :{numberOfFollows:1}},{'new': true},(err, doc) => {
                if(err){
                    return res.status(500).json({error:err})
                }
                User.update({_id: idUser},{$push:{follows: idClinic}}, (err,doc) => {
                    if(err) {
                        return res.status(500).json({error: err})
                    }
                })
                res.status(200).json({doc})
            })
               
    })
})

router.post('/unfollow/:idClinic', (req,res) => {
    const idClinic = req.params.idClinic;
    const idUser = req.body._idUser;
    User.findById(idUser, (err,result)=> {
       
            Clinic.update({_id:idClinic}, {$inc :{numberOfFollows:-1}},{'new': true},(err, doc) => {
                if(err){
                    return res.status(500).json({error:err})
                }
                User.update({_id: idUser},{$pull:{follows: idClinic}}, (err,doc) => {
                    if(err) {
                        return res.status(500).json({error: err})
                    }
                })
                res.status(200).json({doc})
            })
               
    })
})
module.exports = router;