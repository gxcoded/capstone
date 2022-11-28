const TestTypes = require("../model/test-types.model.js");

exports.addTestType = async (req, res, callback) => {
  const type = {
    description: req.body.description,
  };

  const newType = new TestTypes(type);

  try {
    const success = await newType.save();
    console.log(success);
    req.body.added = true;
  } catch (error) {
    req.body.added = false;
  }

  await callback();
};

exports.getTestTypes = async (req, res, callback) => {
  try {
    const testTypes = await TestTypes.find();
    req.body.testTypes = testTypes;
  } catch (err) {
    req.body.testTypes = {};
  }
  await callback();
};
