const Icon = require("../model/icons.model");

exports.addIcon = async (req, res, next) => {
  const icon = {
    description: req.body.description,
  };

  const newIcon = new Icon(icon);

  await newIcon
    .save()
    .then((r) => (req.body.added = true))
    .catch((e) => {
      req.body.added = false;
    });
  await next();
};

exports.getIcon = async (req, res, callback) => {
  await Icon.find()
    .then((result) => {
      req.body.iconList = result;
    })
    .catch((error) => {
      req.body.iconList = [];
    });
  await callback();
};
