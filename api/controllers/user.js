const User = require('../models/user');
const bcrypt = require('bcrypt');
const Client = require('authy-client').Client;
const authy = new Client({ key: process.env.API_KEY })
const enums = require('authy-client').enums;

exports.get_users = (req, res) => {
  const userId = req.params.idUser;
  
  User.find().exec()
    .then(doc => res.status(200).json({users:doc}))
    .catch(err => res.status(400).json({err}))
}

exports.get_user = (req, res) => {
  const userId = req.params.idUser;
  
  User.findById(userId).exec()
    .then(doc => res.status(200).json({user:doc}))
    .catch(err => res.status(400).json({err}))
}

exports.get_current_user = (req, res) => {
  const userId = req.userData.userId;
  User.findById(userId).exec()
    .then(doc => {
      const { lastName, firstName, gender, phoneNumber, follows, email, avatar, permission, ticketInfo } = doc;

      res.status(200).json({
        lastName,
        firstName,
        phoneNumber,
        follows,
        gender,
        email,
        avatar,
        permission,
        ticketInfo
      })
    })
    .catch(err => res.status(404).json({ err }))
}

exports.update_user = (req, res) => {
  const userId = req.userData.userId;
  console.log("haha", req.file)
  User.findByIdAndUpdate(userId, {
    $set: {
      avatar:  req.file.path
    }
  }, { new: true })
    .exec()
    .then(doc => {
      res.status(200).json({
        doc
      })
    })
    .catch(err => res.status(404).json({ err }))
}

exports.require_be_doctor = (req, res) => {
  console.log(req.files)
  const idUser = req.params.idUser;
  const imageOfIdentificationFront =  req.files.imageOfIdentificationFront[0].url;
  const imageOfIdentificationBack =  req.files.imageOfIdentificationBack[0].url;
  const imageOfDiploma =  req.files.imageOfDiploma[0].url;
  const departments = req.body.departments;
  // console.log(req.files.imageOfIdentificationFront.url)
  User.findByIdAndUpdate(idUser,{
    $set: {
      imageOfDiploma,
      imageOfIdentificationFront,
      imageOfIdentificationBack,
      requireVerify: true,
      departments
    }
  },{new: true}).exec()
    .then(doc=> {
      res.status(200).json({
        doc
      })
    })
    .catch(err => {
      res.status(404).json({
        err
      })
  })
}

exports.update_information_user = (req, res) => {
  User.findByIdAndUpdate(req.params.idUser, {$set: req.body}, {new: true}).exec()
    .then(doc => {
      res.status(200).json({
        doc
      })
    })
    .catch(err => {
      res.status(404).json({
        err
      })
    })
}

exports.forgot_password = (req, res) => {
  const { email, phoneNumber } = req.body
  User.findOne({ email, phoneNumber }).exec()
    .then(user => {
      if(!user) {
        res.status(400).json({error: "Email hoặc số điện thoại không đúng"})
      }
      authy.startPhoneVerification({
        countryCode: 'VN',
        locale: 'en',
        phone: req.body.phoneNumber,
        via: enums.verificationVia.SMS
      }, (error, response) => {
        if (error) {
          return console.log(error)
        };
      });
      res.status(200).json({userId: user._id, phoneNumber: user.phoneNumber})
    })
}

exports.verify_user = (req,res) => {
  const {phoneNumber, userId} = req.body
  authy.verifyPhone({
    countryCode: 'VN',
    phone: phoneNumber,
    token: code
  }, (error, response) => {
    if (error) {
      return res.status(404).send({
        "error": "code was wrong"
      });
    }
    res.status(200).json({userId})
  });
}
exports.change_new_password = (req, res) => {
  const{idUser, password} =req.body;
  bcrypt.hash(password,10,(err, hash) => {
    User.findByIdAndUpdate(idUser,{ $set: {password: hash}}, {new: true}).exec()
      .then(user => {
        if(!user){
          res.status(400).json({err: "user doesn't exist"})
        }
        res.status(200).json({res: user})
      })
  })
}

exports.change_password = async (req, res) => {
  const {oldPassword, newPassword} = req.body;
  User.findById(req.params.idUser).exec()
    .then(user => {
      bcrypt.compare(oldPassword, user.password, async (err, result) => {
        if(!result){
          return res.status(400).json({
            result: "Mật khẩu cũ sai"
          })
        }

        if(result) {
          const hashNewPassword = await bcrypt.hash(newPassword, 10);
          User.findByIdAndUpdate(req.params.idUser, {$set: {password: hashNewPassword}}).exec()
            .then(doc => {
              return res.status(200).json({
                result: "Change password successfully"
              })
            })
            .catch(error => {
              res.status(404).json({
                err
              })
            })
          
        }
      })
    })
    .catch(err => {
      res.status(404).json({
        err
      })
    })
}

exports.change_permission = (req, res) => {
  User.findByIdAndUpdate(req.params.idUser, {$set : { permission: req.body.permission, requireVerify: false }},{new: true}).exec()
    .then(doc => {
      res.status(200).json({doc})
    }).catch(err => {
      res.status(400).json({err})
    })
}