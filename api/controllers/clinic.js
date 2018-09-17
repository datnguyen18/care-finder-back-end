const Clinic = require('../models/clinic');
const mongoose = require('mongoose');

exports.create_new_clinic = (req,res) => {

    let urls = []
    req.files.forEach(element => {
        urls.push('http://localhost:3000/'+element.path)
    });

    console.log('====================================');
    console.log(urls);
    console.log('====================================');
    const clinic = new Clinic({
        _id: new mongoose.Types.ObjectId(),
        _idDoctor: req.body._idDoctor,
        name: req.body.name,
        address: req.body.address,
        department: req.body.department,
        phoneNumber: req.body.phoneNumber,
        imageUrls: urls
    })

    clinic.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Handling POST requests to /clinic ',
                createdClinic: clinic
            })
        })
        .catch(err => {
            res.status(500).json({
                error:err
            })
        })
}

exports.follow_clinic = (req,res) => {
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
}