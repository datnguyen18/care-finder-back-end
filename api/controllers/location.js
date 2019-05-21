const Location = require('../models/location');
const mongoose = require('mongoose');
const User = require('../models/user');
const Review = require('../models/review');
const Department = require('../models/department');

exports.create_new_location = (req, res) => {
  let urls = [];
  req.files.forEach(element => {
    urls.push(element.url)
  });

  console.log('====================================');
  console.log(urls);
  console.log('====================================');
  console.log(req.body.timeOpen);
  console.log('====================================');

  const address = {};
  address.street = req.body.street;
  address.ward = req.body.ward;
  address.district = req.body.district;
  address.city = req.body.city;

  let coordinates = {};
  coordinates.latitude = req.body.latitude;
  coordinates.longitude = req.body.longitude;

  const location = new Location({
    _id: new mongoose.Types.ObjectId(),
    _idDoctor: req.body._idDoctor,
    name: req.body.name,
    address: address,
    departments: req.body.departments,
    phoneNumber: req.body.phoneNumber,
    imageUrls: urls,
    website: req.body.website,
    coordinates: coordinates,
    timeOpen: JSON.parse(req.body.timeOpen)
  });
  location.save()
    .then(result => {
      console.log(result);
      if (typeof req.body.departments === "string") {
        Department.findOneAndUpdate({ name: req.body.departments }, { $push: { locations: location._id } }).then(doc => {
          console.log("success")
        })
      } else {
        req.body.departments.forEach(e => {
          Department.findOneAndUpdate({ name: e }, { $push: { locations: location._id } }).then(doc => {
            console.log("success")
          })
        })
      }


      res.status(200).json({
        message: 'Handling POST requests to /Location ',
        createdLocation: location
      });
    })
    .catch(err => {
      console.log(err)
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

    Location.update({ _id: idLocation }, { $inc: { numberOfFollows: 1 } }, { 'new': true }, (err, doc) => {
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
    Location.update({ _id: idLocation }, { $inc: { numberOfFollows: -1 } }, { 'new': true }, (err, doc) => {
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
  const { content, rating, _idUser } = req.body
  Location.findByIdAndUpdate(idLocation, { $push: { reviews: req.body } }, { new: true }, (err, doc) => {
    if (err) {
      res.status(404).json({
        err
      });
    }
    console.log(doc.ratingAvg.location)
    const length = doc.reviews.length;
    doc.ratingAvg.location = calculateAvg(doc.ratingAvg.location, rating.location, length);
    doc.ratingAvg.price = calculateAvg(doc.ratingAvg.price, rating.price, length);
    doc.ratingAvg.quality = calculateAvg(doc.ratingAvg.quality, rating.quality, length);
    doc.ratingAvg.attitude = calculateAvg(doc.ratingAvg.attitude, rating.attitude, length);
    doc.totalRatingAvg = parseFloat((doc.ratingAvg.location + doc.ratingAvg.price + doc.ratingAvg.quality + doc.ratingAvg.attitude) / 4).toFixed(2);
    doc.save((error) => {
      res.status(200).json({ doc })
    })

  });
};

calculateAvg = (current, newVal, length) => {
  return Math.round(((current * (length - 1)) + newVal) / length * 10) / 10
}

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

  Location.findByIdAndUpdate(idLocation, { $inc: { countView: 1 } }, { new: true }).exec()
    .then(doc => {
      console.log(doc)
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
  if (!req.query.last) {
    Location.find()
      .then(doc => {
        res.status(200).json({
          doc: doc
        });
      })
      .catch(err => res.status(400).json({
        err
      }));
  } else {
    var lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - parseInt(req.query.last));
    Location.find({
      "date":
        { $gte: lastWeek }
    }
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

function pad(n){
	return n < 10 ? '0' + n : n;
}

exports.get_bookingTime = (req, res) => {
  const idLocation = req.body.idLocation;
  const dateBooking = req.body.dateBooking;
  Location.findById(idLocation).then(location => {
    var date = new Date(dateBooking);
    var dayOfWeek = date.getDay();
    var isCloseAllDay = location.timeOpen[dayOfWeek][0].isCloseAllDay;
    if (isCloseAllDay) {
      return res.status(200).json({ "status": "Closed Today" });
    }
    if (location.timeBooking == null || location.timeBooking.filter((time) => {
      return time.date == dateBooking;
    }).length == 0) {
      var from = location.timeOpen[dayOfWeek][0].from;
      var start = parseInt(from);
      var to = location.timeOpen[dayOfWeek][0].to;
      var end = parseInt(to);
      var timeBooking = [];
      for (var i = start; i < end; i++) {
        if (i == 11) {
          continue;
        }
        for (var j = 0; j <= 45; j += 15) {
          var time = {};
          var timeFormat = pad(i) + ":" + pad(j);
          time.time = timeFormat;
          time.userId = "";
          timeBooking.push(time);
        }
      }
      var obj = {};
      obj.date = dateBooking;
      obj.time = timeBooking;
      Location.findByIdAndUpdate(idLocation, { $push: { timeBooking: obj } }, { new: true }).exec()
        .then(doc => {
          res.status(200).json({
            timeBooking: obj
          });
        })
        .catch(err => {
          res.status(404).json({
            err: err
          });
        });
    } else {
      var obj = location.timeBooking.filter((time) => {
        return time.date == dateBooking;
      })
      res.status(200).json({ "timeBooking": obj[0] });
    }
  })
}