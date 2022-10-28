const Building = require('../model/building.model')


exports.addBuilding = async (req,res,next)=>{

     const building = {
        campus : req.body.campus,
        description : req.body.description
     }
   
     const newBuilding = new Building(building)
     
     await newBuilding.save().then(c =>{
        req.body.added = true
     }).catch(err=>{
        req.body.added = false;
     })

     await next()
}

exports.getBuildings = async (req,res,callback)=>{
    const campus = req.body.campus

    await Building.find({campus}).sort({description: 1}).then(buildings=>{
        req.body.buildings = buildings;
    }).catch(err=>{
        req.body.buildings = []
    })
    
    await callback()
}
