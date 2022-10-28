const router = require("express").Router();
const {
  addCampus,
  getCampus,
  getCampusKey,
} = require("../controller/campus.controller");

const {
  addCourse,
  getCourse,
  updateCourseStatus,
} = require("../controller/course.controller");

const Subjects = require("../controller/subject.controller");
const Classes = require("../controller/class.controller");
const Icons = require("../controller/icons.controller");
const Meeting = require("../controller/meeting.controller");
const ClassRoom = require("../controller/classRoom.controller");
const Attendance = require("../controller/attendance.controller");
const Message = require("../controller/message.controller");
const ContactTracer = require("../controller/contactTracer.controller");
const Positive = require("../controller/positive.controller");
const Assign = require("../controller/assignedRoom.controller");
const PersonalLog = require("../controller/personalLog.controller");

const {
  addSemester,
  getSemesters,
} = require("../controller/semester.controller");
const {
  addSections,
  getSections,
} = require("../controller/sections.controller");
const {
  sectionStatusManager,
  sectionStatusFinder,
  getSectionList,
} = require("../controller/sectionStatus.controller");
const {
  addAcademicYear,
  getAcademicYear,
} = require("../controller/academicYear.controller");
const {
  addYearLevel,
  getYearLevels,
} = require("../controller/yearLevel.controller");
const {
  temp,
  walkInReg,
  findTemp,
  getTemp,
  register,
  staffAccount,
  checkId,
} = require("../controller/registration.controller");
const {
  getChairs,
  checkChair,
  assignChair,
  unAssign,
} = require("../controller/chair.controller");
const { login } = require("../controller/login.controller");
const {
  getSingleAccount,
  updatePassword,
  updateAccountInfo,
  checkUser,
  checkUsername,
  resetPassword,
  finalizeVerification,
} = require("../controller/account.controller");
const {
  getStaffAccounts,
  searchStaffs,
  searchTeaching,
  updateStaffInfo,
  getNonTeachingAccounts,
} = require("../controller/staff.controller");
const { walkIns } = require("../controller/walkin.controller");
const {
  addRoom,
  getRooms,
  searchRooms,
  updateRoomScanControl,
  updateRoomStatus,
  updateRoomDescription,
} = require("../controller/room.controller");
const {
  addBuilding,
  getBuildings,
} = require("../controller/building.controller");
const {
  getDepartments,
  addDepartment,
  searchDepartments,
  updateDepartment,
  deleteDepartment,
  updateDepartmentStatus,
} = require("../controller/department.controller");
const {
  getOffice,
  addOffice,
  searchOffices,
  updateOffice,
  deleteOffice,
  updateOfficeStatus,
} = require("../controller/office.controller");
const { getGender } = require("../controller/gender.controller");
const { getVaxStatus } = require("../controller/vaxStatus.controller");
const { addRole, getRole } = require("../controller/role.controller");
const {
  getStudents,
  searchStudents,
  searchClassStudents,
  getStudentsByCourse,
} = require("../controller/student.controller");
const {
  sendEmail,
  getLink,
  checkResetLink,
  sendResetLink,
} = require("../controller/email.controller");
const {
  getScannedAccount,
  getManualAccount,
} = require("../controller/scan.controller");
const {
  addLog,
  getLogs,
  updateLog,
  tracker,
  timeOut,
  getEntranceLogs,
} = require("../controller/logs.controller");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");

const encrypt = async (id) => {
  return await bcrypt.hash(id, 10);
};

//===========Campus Routes=================
router.post("/addCampus", addCampus, (req, res) => {
  res.status(200).send(req.body.added);
});

router.get("/campusList", getCampus, (req, res) => {
  res.status(200).send(req.body.campusList);
});

router.get("/campusKey", getCampusKey, (req, res) => {
  res.status(200).send(req.body.campusList);
});

//===========Course Routes=================
router.post("/addCourse", addCourse, (req, res) => {
  res.status(200).send(req.body.added);
});

router.post("/courseList", getCourse, (req, res) => {
  res.status(200).send(req.body.course);
});

router.post("/updateCourseStatus", updateCourseStatus, (req, res) => {
  res.status(200).send(req.body.updated);
});

//===========Section Routes=================
router.post("/addSection", addSections, (req, res) => {
  res.status(200).send(req.body.added);
});

router.post("/sectionList", getSections, (req, res) => {
  res.status(200).send(req.body.sections);
});

router.post("/sectionStatus", sectionStatusManager, (req, res) => {
  res.status(200).send(req.body.success);
});

router.post("/findSectionStatus", sectionStatusFinder, (req, res) => {
  res.status(200).send(req.body.stats);
});

router.post("/getSectionList", getSectionList, (req, res) => {
  res.status(200).send(req.body.list);
});

//===========Message Routes=================
router.post("/addMessage", Message.addMessage, (req, res) => {
  res.status(200).send(req.body.success);
});

router.post("/getMessage", Message.getMessage, (req, res) => {
  res.status(200).send(req.body.text);
});

//===========Subjects Routes=================
router.post("/addSubject", Subjects.addSubject, (req, res) => {
  res.status(200).send(req.body.saved);
});

router.post("/getSubjects", Subjects.getSubjects, (req, res) => {
  res.status(200).send(req.body.subjects);
});

router.post("/deleteSubject", Subjects.deleteSubject, (req, res) => {
  res.status(200).send(req.body.deleted);
});
//===========Semester Routes=================
router.post("/addSemester", addSemester, (req, res) => {
  res.status(200).send(req.body.added);
});

router.get("/getSemesters", getSemesters, (req, res) => {
  res.status(200).send(req.body.semesters);
});

//===========AY Routes=================
router.post("/addAcademicYear", addAcademicYear, (req, res) => {
  res.status(200).send(req.body.added);
});
router.get("/getAcademicYear", getAcademicYear, (req, res) => {
  res.status(200).send(req.body.academics);
});
//===========Year Levels Routes=================
router.post("/addYearLevel", addYearLevel, (req, res) => {
  res.status(200).send(req.body.added);
});
router.get("/getYearLevels", getYearLevels, (req, res) => {
  res.status(200).send(req.body.yearLevels);
});
//===========Building Routes=================
router.post("/addBuilding", addBuilding, (req, res) => {
  res.status(200).send(req.body.added);
});

router.post("/buildingList", getBuildings, (req, res) => {
  res.status(200).send(req.body.buildings);
});
//===========Icons Routes=================
router.post("/addIcon", Icons.addIcon, (req, res) => {
  res.status(200).send(req.body.added);
});

router.get("/iconList", Icons.getIcon, (req, res) => {
  res.status(200).send(req.body.iconList);
});

//===========Department Routes=================
router.post("/addDepartment", addDepartment, (req, res) => {
  res.status(200).send(req.body.added);
});

router.post("/getDepartments", getDepartments, (req, res) => {
  res.status(200).send(req.body.departments);
});

router.post("/searchDepartments", searchDepartments, (req, res) => {
  res.status(200).send(req.body.departmentList);
});

router.post("/updateDepartment", updateDepartment, (req, res) => {
  res.status(200).send(req.body.updated);
});

router.post("/updateDepartmentStatus", updateDepartmentStatus, (req, res) => {
  res.status(200).send(req.body.updated);
});

router.post("/deleteDepartment", deleteDepartment, (req, res) => {
  res.status(200).send(req.body.deleted);
});

//===========Office Routes=================
router.post("/addOffice", addOffice, (req, res) => {
  res.status(200).send(req.body.added);
});

router.post("/getOffices", getOffice, (req, res) => {
  res.status(200).send(req.body.offices);
});

router.post("/searchOffices", searchOffices, (req, res) => {
  res.status(200).send(req.body.officeList);
});

router.post("/updateOffice", updateOffice, (req, res) => {
  res.status(200).send(req.body.updated);
});

router.post("/updateOfficeStatus", updateOfficeStatus, (req, res) => {
  res.status(200).send(req.body.updated);
});

router.post("/deleteOffice", deleteOffice, (req, res) => {
  res.status(200).send(req.body.deleted);
});

//===========Room Routes=================
router.post("/addRoom", addRoom, (req, res) => {
  res.status(200).send(req.body.added);
});

router.post("/roomList", getRooms, (req, res) => {
  res.status(200).send(req.body.rooms);
});

router.post("/searchRoom", searchRooms, (req, res) => {
  res.status(200).send(req.body.rooms);
});

router.post("/updateRoomDescription", updateRoomDescription, (req, res) => {
  res.status(200).send(req.body.updated);
});

router.post("/updateRoomStatus", updateRoomStatus, (req, res) => {
  res.status(200).send(req.body.updated);
});

router.post("/updateRoomScanControl", updateRoomScanControl, (req, res) => {
  res.status(200).send(req.body.updated);
});

//===========Class Routes=================
router.post("/saveClass", Classes.saveClass, (req, res) => {
  res.status(200).send(req.body.saved);
});
router.post("/getClasses", Classes.getClasses, (req, res) => {
  res.status(200).send(req.body.classList);
});

router.post("/updateClassStatus", Classes.updateStatus, (req, res) => {
  res.status(200).send(req.body.updated);
});

//===========ClassRoom Routes=================
router.post("/getStudentsByCourse", getStudentsByCourse, (req, res) => {
  res.status(200).send(req.body.studentList);
});
router.post(
  "/addClassRoomStudent",
  ClassRoom.addClassRoomStudent,
  (req, res) => {
    res.status(200).send(req.body.studentAdded);
  }
);

router.post(
  "/getClassRoomStudents",
  ClassRoom.getClassRoomStudents,
  (req, res) => {
    res.status(200).send(req.body.classStudents);
  }
);

router.post(
  "/removeClassRoomStudent",
  ClassRoom.removeClassRoomStudent,
  (req, res) => {
    res.status(200).send(req.body.removed);
  }
);
//===========Contact Tracer Routes==========
router.post(
  "/contact-tracer-search",
  ContactTracer.searchAccount,
  (req, res) => {
    res.send(req.body.result);
  }
);

router.post("/showInteractions", ContactTracer.searchContacts, (req, res) => {
  res.send(req.body.contacts);
});

router.post(
  "/getPossibleInteractions",
  ContactTracer.possibleInteractions,
  (req, res) => {
    res.send(req.body.result);
  }
);
//===========Meeting Routes=================
router.post("/addMeeting", Meeting.addMeeting, (req, res) => {
  res.status(200).send(req.body.created);
});

router.post("/getMeeting", Meeting.getMeeting, (req, res) => {
  res.status(200).send(req.body.current);
});

router.post("/getMeetingList", Meeting.getMeetingList, (req, res) => {
  res.status(200).send(req.body.meetingList);
});

router.post("/endMeeting", Meeting.updateMeetingStatus, (req, res) => {
  res.status(200).send(req.body.updated);
});

router.post("/addMeetingLog", Meeting.addMeetingLog, (req, res) => {
  res.status(200).send(req.body.added);
});

router.post("/addMeetingSitIn", Meeting.addMeetingSitIn, (req, res) => {
  res.status(200).send(req.body.added);
});

router.post("/addMeetingGuest", Meeting.addMeetingGuest, (req, res) => {
  res.status(200).send(req.body.added);
});

router.post("/getMeetingLogs", Meeting.getMeetingLogs, (req, res) => {
  res.status(200).send(req.body.logs);
});

router.post("/updateMeetingStatus", Meeting.updateMeetingLog, (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body.updated);
});

//===========Role Routes=================
router.post("/addRole", addRole, (req, res) => {
  res.status(200).send(req.body.added);
});

router.get("/getRole", getRole, (req, res) => {
  res.status(200).send(req.body.roleList);
});

//===========Gender Routes=================
router.get("/getGender", getGender, (req, res) => {
  res.status(200).send(req.body.genderList);
});

//===========VaxStatus Routes=================
router.get("/getVaxStatus", getVaxStatus, (req, res) => {
  res.status(200).send(req.body.statusList);
});

//================Verification=======================

router.post("/authenticate", findTemp, (req, res) => {
  res.status(200).send(req.body.confirmed);
});

router.post("/getUsername", getTemp, (req, res) => {
  res.status(200).send(req.body.generatedUsername);
});

//================Registration=======================

router.post("/registerAccount", register, (req, res) => {
  res.status(200).send([]);
});

router.post("/checkId", checkId, (req, res) => {
  res.status(200).send(req.body.exist);
});

//================Login=======================

router.post("/login", login, (req, res) => {
  res.status(200).send(req.body.data);
});

//================Account=======================

router.post("/accountInfo", getSingleAccount, (req, res) => {
  res.status(200).send(req.body.details);
});

router.post("/updatePassword", updatePassword, (req, res) => {
  res.status(200).send(req.body.updated);
});

router.post("/updateAccountInfo", updateAccountInfo, (req, res) => {
  res.status(200).send(req.body.isUpdated);
});

router.post("/checkUsername", checkUsername, (req, res) => {
  res.status(200).send(req.body.codeHash);
});

router.post("/finalizeVerification", finalizeVerification, (req, res) => {
  res.status(200).send(req.body.updated);
});

router.post("/checkVerification", async (req, res) => {
  let isCorrect = false;

  try {
    isCorrect = await bcrypt.compare(req.body.code, req.body.hashCode);
  } catch (error) {
    console.log(error);
  }
  res.status(200).send(isCorrect);
});

// ==============Chair Routes======================
router.post("/getChairs", getChairs, (req, res) => {
  res.status(200).send(req.body.chairs);
});

router.post("/checkChair", checkChair, (req, res) => {
  console.log(req.body.chairInfo);
  res.status(200).send(req.body.chairInfo);
});

router.post("/assignChair", assignChair, (req, res) => {
  res.status(200).send(req.body.success);
});

router.post("/unAssignChair", unAssign, (req, res) => {
  res.status(200).send(req.body.unassigned);
});
// ==============Students Routes======================

router.post("/getStudents", getStudents, (req, res) => {
  res.status(200).send(req.body.studentList);
});

router.post("/searchStudents", searchStudents, (req, res) => {
  res.status(200).send(req.body.studentList);
});

router.post("/searchClassStudents", searchClassStudents, (req, res) => {
  res.status(200).send(req.body.studentList);
});
// ==============Walk in Routes======================

router.post("/getWalkIns", walkIns, (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body.walkIns);
});

// ==============Staff Routes======================

router.post("/staffAccounts", getStaffAccounts, (req, res) => {
  res.status(200).send(req.body.staffList);
});

router.post("/searchStaffs", searchStaffs, (req, res) => {
  res.status(200).send(req.body.staffList);
});

router.post("/searchTeaching", searchTeaching, (req, res) => {
  res.status(200).send(req.body.staffList);
});

router.post("/updateStaffInfo", updateStaffInfo, (req, res) => {
  res.status(200).send(req.body.updated);
});

router.post("/getNonTeachingAccounts", getNonTeachingAccounts, (req, res) => {
  res.status(200).send(req.body.staffList);
});

// ==============Email Routes======================

router.post("/sendLink", sendEmail, (req, res) => {
  res.status(200).send(req.body.sent);
});

router.post("/getLink", getLink, (req, res) => {
  res.status(200).send(req.body.data);
});

// ==============Password Reset Routes======================

router.post("/checkUser", checkUser, sendResetLink, (req, res) => {
  res.status(200).send(req.body.sent);
});

router.post("/checkResetLink", checkResetLink, (req, res) => {
  res.status(200).send(req.body.data);
});

router.post("/resetPassword", resetPassword, (req, res) => {
  res.status(200).send(req.body.updated);
});
// ==============Scanner Routes======================

router.post("/accounts", getScannedAccount, (req, res) => {
  res.status(200).send(req.body.result);
});

router.post("/getManualAccount", getManualAccount, (req, res) => {
  res.status(200).send(req.body.result);
});

// ===============Entrance Scanner Logs===========================

router.post("/personalLog", PersonalLog.logger, (req, res) => {
  res.status(200).send(req.body.response);
});

// ===============Scanner Logs===========================

router.post("/getAttendanceLog", Attendance.getAttendanceLog, (req, res) => {
  res.status(200).send(req.body.attendanceLog);
});

router.post("/allAttendance", Attendance.getAllAttendance, (req, res) => {
  res.status(200).send(req.body.all);
});

// router.post("/addAttendanceLog", addAttendanceLog, (req, res) => {
//   res.status(200).send([]);
// });

router.post("/fetchLogs", getLogs, (req, res) => {
  res.status(200).send(req.body.logs);
});

router.post("/fetchEntranceLogs", getEntranceLogs, (req, res) => {
  res.status(200).send(req.body.logs);
});

router.post("/exitLog", timeOut, (req, res) => {
  res.status(200).send(req.body.updated);
});

router.post("/updateLog", updateLog, (req, res) => {
  res.status(200).send(req.body.updated);
});

router.post("/staffTracker", tracker, (req, res) => {
  res.status(200).send(req.body.location);
});
// ===============Test=========================
router.get("/get-sample-csv", (req, res) => {
  res.download("../server/files/sample.csv");
});
// ==================Multer========================

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}--${file.originalname}`);
  },
});

const maxSize = 5 * 1024 * 1024;

const upload = multer({
  storage: fileStorageEngine,
  fileFilter: (req, file, callback) => {
    const extName = path.extname(file.originalname);
    if (
      extName !== ".png" &&
      extName !== ".jpg" &&
      extName !== ".gif" &&
      extName !== ".jfif" &&
      extName !== ".jpeg"
    ) {
      return callback(new Error("Images Only"));
    }
    callback(null, true);
  },
  limits: { fieldSize: maxSize },
});

router.post("/preRegister", upload.single("file"), async (req, res) => {
  const tempId = await encrypt(req.body.phoneNumber);

  temp(req.file.filename, req.body, tempId);
  res.status(200).send(tempId);
});

router.post("/staffRegister", upload.single("file"), async (req, res) => {
  staffAccount(req.file.filename, req.body);
  res.status(200).send(true);
});

router.post("/walkInReg", upload.single("file"), async (req, res) => {
  walkInReg(req.file.filename, req.body);
  res.status(200).send(true);
});

router.post("/reportPositive", upload.single("file"), async (req, res) => {
  Positive.notificationMessages(req.file.filename, req.body);
  res.status(200).send(true);
});

router.post("/getSentMessages", Positive.getSentMessages, (req, res) => {
  res.status(200).send(req.body.messages);
});

router.post("/countNewMessages", Positive.countNewMessage, (req, res) => {
  res.status(200).send(req.body.messages);
});

router.post("/getAllNewMessages", Positive.getAllNewMessages, (req, res) => {
  res.status(200).send(req.body.messages);
});

router.post("/getAllMessages", Positive.getAllMessages, (req, res) => {
  res.status(200).send(req.body.messages);
});

router.post(
  "/updateMessageStatus",
  Positive.updateMessageStatus,
  (req, res) => {
    res.status(200).send(req.body.updated);
  }
);

router.post("/setMessageReply", Positive.setMessageReply, (req, res) => {
  res.status(200).send(req.body.updated);
});

// =========Assigned Rooms===================

router.post("/assignRoom", Assign.assignRoom, (req, res) => {
  res.status(200).send(req.body.saved);
});

router.post("/getAssignedRooms", Assign.getAssignedRooms, (req, res) => {
  res.status(200).send(req.body.assigned);
});

router.post("/checkAssignedRoom", Assign.checkAssignedRoom, (req, res) => {
  res.status(200).send(req.body.assigned);
});

// >?Gp@787JY@n~NuF

module.exports = router;
