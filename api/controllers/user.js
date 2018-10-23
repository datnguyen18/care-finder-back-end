const User = require('../models/user');

exports.get_current_user = (req,res) => {
  const userId = req.userData.userId;

  User.findById(userId).exec()
    .then(doc =>{
      const {lastName, firstName, gender,phoneNumber, follows} = doc;

      res.status(200).json({
        lastName,
        firstName,
        phoneNumber,
        follows,
        gender
      })
    })
    .catch(err => res.status(404).json({err}))
}