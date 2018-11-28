const User = require('../models/user');

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
      const { lastName, firstName, gender, phoneNumber, follows, email, avatar } = doc;

      res.status(200).json({
        lastName,
        firstName,
        phoneNumber,
        follows,
        gender,
        email,
        avatar
      })
    })
    .catch(err => res.status(404).json({ err }))
}

exports.update_user = (req, res) => {
  const userId = req.userData.userId;
  console.log(req.body)
  User.findByIdAndUpdate(userId, {
    $set: {
      avatar: 'http://localhost:3000/uploads/' + req.file.filename
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