const Classes = require("../model/class.model");

exports.saveClass = async (req, res, callback) => {
  if (req.body.currentId.length > 0) {
    await Classes.updateOne(
      { _id: req.body.currentId },
      {
        $set: {
          course: req.body.course,
          yearLevel: req.body.yearLevel,
          section: req.body.section,
          subject: req.body.subject,
          icon: req.body.icon,
        },
      }
    )
      .then((updated) => {
        req.body.saved = true;
      })
      .catch((err) => {
        req.body.saved = false;
      });
  } else {
    const classes = {
      campus: req.body.campus,
      account: req.body.account,
      course: req.body.course,
      semester: req.body.semester,
      yearLevel: req.body.yearLevel,
      section: req.body.section,
      subject: req.body.subject,
      defaultTimeStart: req.body.defaultStart,
      defaultRoom: req.body.defaultRoom,
      icon: req.body.icon,
    };

    const newClasses = new Classes(classes);

    await newClasses
      .save()
      .then((okay) => {
        req.body.saved = true;
      })
      .catch((err) => {
        req.body.saved = false;
      });
  }

  await callback();
};

exports.getClasses = async (req, res, callback) => {
  await Classes.find({
    campus: req.body.campus,
    account: req.body.account,
    // academic: req.body.academic,
    // semester: req.body.semester,
  })
    .populate("course")
    // .populate("section")
    .populate("yearLevel")
    .populate("subject")
    .populate("icon")
    .then((result) => {
      console.log(result);
      if (result.length > 0) {
        req.body.classList = result;
      } else {
        req.body.classList = [];
      }
    })
    .catch((err) => {
      console.log(err);
      req.body.classList = [];
    });
  await callback();
};

exports.updateStatus = async (req, res, callback) => {
  const _id = req.body.id;
  const isHidden = req.body.status;

  await Classes.findOneAndUpdate({ _id }, { $set: { isHidden: isHidden } })
    .then((res) => {
      req.body.updated = true;
    })
    .catch((err) => {
      console.log(err);
      req.body.updated = false;
    });

  await callback();
};
