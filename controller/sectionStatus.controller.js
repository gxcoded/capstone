const SectionStatus = require("../model/sectionStatus.model");

exports.sectionStatusManager = async (req, res, callback) => {
  const status = {
    campus: req.body.campus,
    academic: req.body.academic,
    course: req.body.course,
    semester: req.body.semester,
    yearLevel: req.body.yearLevel,
    section: req.body.section,
  };

  await SectionStatus.findOne({
    campus: status.campus,
    academic: status.academic,
    course: status.course,
    semester: status.semester,
    yearLevel: status.yearLevel,
    section: status.section,
  })
    .then(async (result) => {
      if (result === null) {
        const newStatus = new SectionStatus(status);

        await newStatus
          .save()
          .then((okay) => {
            req.body.success = true;
          })
          .catch((err) => {
            req.body.success = false;
          });
      } else {
        await SectionStatus.updateOne(
          {
            campus: status.campus,
            academic: status.academic,
            course: status.course,
            semester: status.semester,
            yearLevel: status.yearLevel,
            section: status.section,
          },
          { $set: { isOpen: !result.isOpen } }
        )
          .then((updated) => {
            req.body.success = true;
          })
          .catch((err) => {
            req.body.success = false;
          });
      }
    })
    .catch((err) => {
      console.log(err);
      req.body.success = false;
    });

  await callback();
};

exports.sectionStatusFinder = async (req, res, callback) => {
  await SectionStatus.findOne({
    campus: req.body.campus,
    academic: req.body.academic,
    course: req.body.course,
    semester: req.body.semester,
    yearLevel: req.body.yearLevel,
    section: req.body.section,
  })
    .then((result) => {
      if (result !== null) {
        req.body.stats = result;
      } else {
        req.body.stats = {};
      }
    })
    .catch((err) => {
      console.log(err);
      req.body.stats = {};
    });
  await callback();
};

exports.getSectionList = async (req, res, callback) => {
  await SectionStatus.find({
    campus: req.body.campus,
    academic: req.body.academic,
    course: req.body.course,
    semester: req.body.semester,
    yearLevel: req.body.yearLevel,
    isOpen: true,
  })
    .populate("section")
    .then((result) => {
      if (result.length > 0) {
        req.body.list = result;
      } else {
        req.body.list = [];
      }
    })
    .catch((err) => {
      console.log(err);
      req.body.list = [];
    });
  await callback();
};
