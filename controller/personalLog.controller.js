const PersonalLog = require("../model/personalLog.model");
const Room = require("../model/rooms.model");

const roleChecker = (role) => {
  switch (role) {
    case "62cb91b12c5804049b716d47":
      return 1;
      break;
    case "62cb8add107251b0d1d0b641":
      return 2;
      break;
    case "62cb8ae9107251b0d1d0b643":
      f;
      return 3;
      break;
    case "62cb91ba2c5804049b716d49":
      return 4;
      break;
    case "62cb91c52c5804049b716d4b":
      return 5;
    default:
      return 0;
  }
};

const accessChecker = async (_id) => {
  let obj = {
    allowed: false,
    location: "Unknown",
  };

  await Room.find({ _id })
    .then(async (result) => {
      if (result.length > 0) {
        // console.log("1");
        // console.log(result[0].allowStudentsAndGuests);
        obj.allowed = result[0].allowStudentsAndGuests;
        obj.location = result[0].description;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return obj;
};

const isTimeOut = async (accountOwner, locationId) => {
  let _id = null;

  await PersonalLog.find({ accountOwner, locationId, timeOut: null })
    .then((result) => {
      if (result.length > 0) _id = result[0]._id;
    })
    .catch((err) => {
      console.log(err);
    });

  return _id;
};

const setTimeIn = async (body) => {
  let successful = false;

  const log = {
    campus: body.campus,
    locationId: body.key.text,
    accountOwner: body.accountOwner,
  };

  const newLog = new PersonalLog(log);

  await newLog
    .save()
    .then((ok) => {
      successful = true;
    })
    .catch((err) => {
      successful = false;
    });

  return successful;
};

const assignTimeOut = async (_id) => {
  console.log(_id);
  let updated = false;
  const timeOut = Date.now().toString();

  await PersonalLog.findOneAndUpdate(
    { _id },
    {
      $set: { timeOut: timeOut },
    }
  )
    .then((ok) => {
      updated = true;
    })
    .catch((err) => {
      console.log(err);
    });

  return updated;
};

exports.logger = async (req, res, callback) => {
  const role = roleChecker(req.body.role);
  const _id = req.body.key.text;

  if (role !== 0) {
    if (role === 4 || role === 5) {
      const allowed = await accessChecker(_id);

      if (allowed.allowed) {
        const timeOut = await isTimeOut(req.body.accountOwner, _id);
        if (timeOut !== null) {
          console.log("true");
          const updated = await assignTimeOut(timeOut);
          req.body.response = {
            success: updated,
            timeIn: false,
            location: allowed.location,
          };
        } else {
          console.log("else");
          const success = await setTimeIn(req.body);
          console.log(success);
          req.body.response = {
            success: success,
            timeIn: true,
            location: allowed.location,
          };
        }
      } else {
        req.body.response = {
          success: false,
          timeIn: false,
          location: allowed.location,
        };
        console.log("Not Allowed");
      }
    } else {
      const allowed = await accessChecker(_id);

      const timeOut = await isTimeOut(req.body.accountOwner, _id);
      if (timeOut !== null) {
        console.log("true1");
        const updated = await assignTimeOut(timeOut);
        req.body.response = {
          success: updated,
          timeIn: false,
          location: allowed.location,
        };
      } else {
        console.log("else1");
        const success = await setTimeIn(req.body);
        console.log(success);
        req.body.response = {
          success: success,
          timeIn: true,
          location: allowed.location,
        };
      }
    }
  } else {
    req.body.response = { success: false, timeIn: false };
  }
  await callback();
};
