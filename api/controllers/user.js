const User = require('../models/user');
const bcrypt = require('bcrypt');

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
      const { lastName, firstName, gender, phoneNumber, follows, email, avatar, permission } = doc;

      res.status(200).json({
        lastName,
        firstName,
        phoneNumber,
        follows,
        gender,
        email,
        avatar,
        permission
      })
    })
    .catch(err => res.status(404).json({ err }))
}

exports.update_user = (req, res) => {
  const userId = req.userData.userId;
  console.log(req.body)
  User.findByIdAndUpdate(userId, {
    $set: {
      avatar:  req.file.url
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