const Role = require("../model/role.model");

exports.addRole = async (req, res, next) => {
  const role = {
    description: req.body.role,
  };

  const newRole = new Role(role);

  await newRole
    .save()
    .then((r) => (req.body.added = true))
    .catch((e) => {
      req.body.added = false;
    });
  await next();
};

exports.getRole = async (req, res, callback) => {
  await Role.find()
    .limit(2)
    .then((result) => {
      req.body.roleList = result;
    })
    .catch((error) => {
      req.body.roleList = [];
    });
  await callback();
};

exports.allRoles = async (req, res, callback) => {
  await Role.find()
    .then((result) => {
      req.body.roleList = result;
    })
    .catch((error) => {
      req.body.roleList = [];
    });
  await callback();
};
