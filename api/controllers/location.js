const Location = require('../models/location');
const mongoose = require('mongoose');
const User = require('../models/user');
const Comment = require('../models/review');

exports.create_new_location = (req, res) => {
  let urls = [];
  req.files.forEach(element => {
    urls.push('http://localhost:3000/' + element.path);
  });

  console.log('====================================');
  console.log(urls);
  console.log('====================================');

  const location = new Location({
    _id: new mongoose.Types.ObjectId(),
    _idDoctor: req.body._idDoctor,
    name: req.body.name,
    address: req.body.address,
    department: req.body.department,
    phoneNumber: req.body.phoneNumber,
    imageUrls: urls
  });
  location.save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Handling POST requests to /Location ',
        createdLocation: location
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.follow_location = (req, res) => {
  const idLocation = req.params.idLocation;
  const idUser = req.body._idUser;
  User.findById(idUser, (err, result) => {
    console.log(result.follows[1]);
    console.log(result.follows.length);
    for (var i = 0; i < result.follows.length; i++) {
      if (String(result.follows[i]) === String(idLocation))
        return res.status(400).json({
          error: 'followed'
        });
    }

    Location.update({_id: idLocation}, {$inc: {numberOfFollows: 1}}, {'new': true}, (err, doc) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      }
      User.update({ _id: idUser }, {
        $push: {
          follows: idLocation
        }
      }, (err, doc) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        }
      });
      res.status(200).json({
        doc
      });
    });

  });
};

exports.unfollow_Location = (req, res) => {
  const idLocation = req.params.idLocation;
  const idUser = req.body._idUser;
  User.findById(idUser, (err, result) => {
    Location.update({_id: idLocation}, {$inc: {numberOfFollows: -1}}, {'new': true}, (err, doc) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      }
      User.update({ _id: idUser }, {
        $pull: {
          follows: idLocation
        }
      }, (err, doc) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        }
      });
      res.status(200).json({
        doc
      });
    });

  });
};
//need_to_done
exports.comment_on_Location = (req, res) => {
  const idLocation = req.params.idLocation;
  const comment = new Comment({
    _idUser: req.body._idUser,
    content: req.body.content,
    date: Date.now(),
    rating: req.body.rating
  });

  Location.findByIdAndUpdate(idLocation, {$push: {reviews: comment}}, {new: true}, (err, doc) => {
    if (err) {
      res.status(404).json({
        err
      });
    }
    res.status(200).json({
      doc
    });

  });
};

exports.modify_Location = (req, res) => {
  const idLocation = req.params.idLocation;
  const address = req.body.address;
  const coordinates = req.body.coordinates;
  const timePeriod = req.body.timePeriod;

  Location.findByIdAndUpdate(idLocation, {
    $set: {
      address,
      coordinates,
      timePeriod
    }
  }, {
      new: true
    }, (err, result) => {
      if (err) {
        res.status(404).json({
          err
        });
      }
      res.status(200).json({
        result
      });
    });

};
//get all Location by id
exports.get_Location = (req, res) => {
  const idLocation = req.params.idLocation;

  Location.findById(idLocation).exec()
    .then(doc => {
      res.status(200).json({
        doc: doc
      });
    })
    .catch(err => {
      res.status(404).json({
        err: err
      });
    });
};

exports.get_all_Location = (req, res) => {
  if(!req.query.last){
    Location.find()
    .then(doc => {
      res.status(200).json({
        doc: doc
      });
    })
    .catch(err => res.status(400).json({
      err
    }));
  }else{
    var lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - parseInt(req.query.last));
    Location.find({"date":
      { $gte : lastWeek }}
    )
      .exec()
      .then(doc => {
        res.status(200).json({
          docs: doc
        })
      })
      .catch(err => {
        res.status(400).json({
          err
        })
      })
  }
};