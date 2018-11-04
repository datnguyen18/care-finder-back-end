const User = require('../models/user');

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