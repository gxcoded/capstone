const Gender = require('../model/gender.model')


exports.getGender = async (req,res,callback)=>{

    await Gender.find().then(result=>{
            req.body.genderList = result;
    }).catch(error=>{
        req.body.genderList = [];
    })
    await callback()
}