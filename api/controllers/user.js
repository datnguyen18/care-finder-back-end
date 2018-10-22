const User = require('../models/user');

exports.get_current_user = (req,res) => {
  const userId = req.userData.userId;

  User.findById(userId).exec()
    .then(doc => res.status(200).json({doc}))
    .catch(err => res.status(404).json({err}))
}