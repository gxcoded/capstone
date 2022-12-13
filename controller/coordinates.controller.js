const Coordinates = require("../model/coordinates.model.js");

exports.addCoordinates = async (req, res, callback) => {
  const coordinate = {
    campus: req.body.campusId,
    lat: req.body.lat,
    lng: req.body.lng,
  };

  const newCoordinate = new Coordinates(coordinate);

  await newCoordinate
    .save()
    .then((added) => {
      req.body.added = true;
    })
    .catch((err) => {
      console.log(err);
      req.body.added = false;
    });

  await callback();
};

exports.getCoordinates = async (req, res, callback) => {
  const campus = req.body.campusId;

  await Coordinates.findOne({ campus })
    .populate("campus")
    .then((result) => {
      req.body.coordinates = result;
    })
    .catch((err) => {
      req.body.coordinates = {};
    });

  await callback();
};
