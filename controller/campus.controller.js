const Campus = require('../model/campus.model');


exports.addCampus = async (req,res,next)=>{
     const campus = {
        campusName: req.body.campusName,
        key: req.body.key
     }
     const newCampus = new Campus(campus)
     await newCampus.save().then(camp => req.body.added = true).catch(e=>{
        req.body.added = false
     })
     await next()
} 

exports.getCampus = async (req,res,next)=>{

    await Campus.find().sort({campusName: 1}).then(campus=>{
        req.body.campusList = campus
    }).catch(err=>{
        req.body.campus = []
    })

    await next()
}

exports.getCampusKey = async (req,res,next)=>{
    
    const id = req.query.id
  

    await Campus.find({_id: id}).then(campusKey=>{
        req.body.campusList = campusKey
    }).catch(err=>{
        req.body.campus = []
    })

    await next()
}