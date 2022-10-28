const VaxStatus = require('../model/vaxStatus.model')


exports.getVaxStatus = async (req,res,callback)=>{

    await VaxStatus.find().sort({description: 1}).then(result=>{
           
            req.body.statusList = result;
    }).catch(error=>{
        req.body.statusList = [];
    })
    await callback()
}