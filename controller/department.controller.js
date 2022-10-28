const Department = require("../model/department.model");

exports.addDepartment = async (req, res, next) => {
  const department = {
    campus: req.body.campus,
    description: req.body.description,
  };

  const newDepartment = new Department(department);

  await newDepartment
    .save()
    .then((c) => {
      req.body.added = true;
    })
    .catch((err) => {
      req.body.added = false;
    });

  await next();
};

exports.getDepartments = async (req, res, callback) => {
  const campus = req.body.campus;

  await Department.find({ campus })
    .sort({ description: 1 })
    .then((departments) => {
      req.body.departments = departments;
    })
    .catch((err) => {
      req.body.departments = [];
    });

  await callback();
};

exports.searchDepartments = async (req, res, callback) => {
  const campus = req.body.campus;

  await Department.find({
    description: { $regex: new RegExp(req.body.keyword, "i") },
    campus: campus,
  })
    .sort({ description: 1 })
    .then((result) => {
      req.body.departmentList = result;
    })
    .catch((err) => {
      req.body.departmentList = [];
    });

  await callback();
};

exports.updateDepartment = async (req, res, callback) => {
  const id = req.body.id;
  const description = req.body.description;

  await Department.updateOne(
    { _id: id },
    { $set: { description: description } }
  )
    .then((result) => {
      req.body.updated = true;
    })
    .catch((err) => {
      req.body.updated = false;
    });
  await callback();
};

exports.deleteDepartment = async (req, res, callback) => {
  const id = req.body.id;

  await Department.deleteOne({ _id: id })
    .then((result) => {
      req.body.deleted = true;
    })
    .catch((err) => {
      req.body.deleted = false;
    });
  await callback();
};

exports.updateDepartmentStatus = async (req, res, callback) => {
  console.log(req.body);
  const _id = req.body.id;
  const isOpen = req.body.isOpen;

  await Department.updateOne({ _id }, { $set: { isOpen: isOpen } })
    .then((result) => {
      console.log(result);
      req.body.updated = true;
    })
    .catch((err) => {
      req.body.updated = false;
    });

  await callback();
};
