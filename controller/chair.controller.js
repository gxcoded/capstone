const Chair = require("../model/chair.model");

exports.getChairs = async (req, res, callback) => {
  const campus = req.body.campus;

  console.log(campus);
  await Chair.find({ campus })
    .populate("account")
    .populate("course")
    .then((result) => {
      result.length > 0 ? (req.body.chairs = result) : (req.body.chairs = []);
    })
    .catch((err) => {
      console.log(err);
      req.body.chairs = [];
    });
  await callback();
};

exports.checkChair = async (req, res, callback) => {
  const account = req.body.account;

  await Chair.findOne({ account })
    .populate("course")
    .then((result) => {
      result !== null
        ? (req.body.chairInfo = result)
        : (req.body.chairInfo = {});
    })
    .catch((err) => {
      req.body.chairInfo = {};
    });
  await callback();
};

exports.assignChair = async (req, res, callback) => {
  const chair = {
    campus: req.body.campus,
    course: req.body.course,
    account: req.body.account,
  };

  console.log(chair);

  await Chair.findOne({
    campus: chair.campus,
    course: chair.course,
  }).then(async (result) => {
    if (result !== null) {
      await Chair.updateOne(
        { course: chair.course },
        { $set: { account: chair.account } }
      )
        .then((r) => {
          req.body.success = true;
        })
        .catch((err) => {
          req.body.success = false;
        });
    } else {
      const newChair = new Chair(chair);

      await newChair
        .save()
        .then((result) => {
          req.body.success = true;
        })
        .catch((err) => {
          req.body.success = false;
        });
    }
  });

  await callback();
};

exports.unAssign = async (req, res, callback) => {
  const id = req.body.id;
  await Chair.findByIdAndDelete({ _id: id })
    .then((d) => {
      req.body.unassigned = true;
    })
    .catch((err) => {
      req.body.unassigned = false;
    });
  await callback();
};
