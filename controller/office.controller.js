const Office = require("../model/office.model");

exports.addOffice = async (req, res, next) => {
  const office = {
    campus: req.body.campus,
    description: req.body.description,
  };

  const newOffice = new Office(office);

  await newOffice
    .save()
    .then((c) => {
      req.body.added = true;
    })
    .catch((err) => {
      req.body.added = false;
    });

  await next();
};

exports.getOffice = async (req, res, callback) => {
  const campus = req.body.campus;

  await Office.find({ campus })
    .sort({ description: 1 })
    .then((offices) => {
      req.body.offices = offices;
    })
    .catch((err) => {
      req.body.offices = [];
    });

  await callback();
};

exports.searchOffices = async (req, res, callback) => {
  const campus = req.body.campus;

  await Office.find({
    description: { $regex: new RegExp(req.body.keyword, "i") },
    campus: campus,
  })
    .sort({ description: 1 })
    .then((result) => {
      req.body.officeList = result;
    })
    .catch((err) => {
      req.body.officeList = [];
    });

  await callback();
};

exports.updateOffice = async (req, res, callback) => {
  const id = req.body.id;
  const description = req.body.description;

  await Office.updateOne({ _id: id }, { $set: { description: description } })
    .then((result) => {
      req.body.updated = true;
    })
    .catch((err) => {
      req.body.updated = false;
    });
  await callback();
};

exports.deleteOffice = async (req, res, callback) => {
  const id = req.body.id;

  await Office.deleteOne({ _id: id })
    .then((result) => {
      req.body.deleted = true;
    })
    .catch((err) => {
      req.body.deleted = false;
    });
  await callback();
};

exports.updateOfficeStatus = async (req, res, callback) => {
  const _id = req.body.id;
  const isOpen = req.body.isOpen;

  await Office.updateOne({ _id }, { $set: { isOpen: isOpen } })
    .then((course) => {
      req.body.updated = true;
    })
    .catch((err) => {
      req.body.updated = false;
    });

  await callback();
};
