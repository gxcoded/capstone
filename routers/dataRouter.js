
const router = require('express').Router();


router.get('/sectionList',(req,res)=>{

    const sectionList = [
        {
            id: 1,
            subjectId : 1,
            value: 1,
            text: 'IT-1A'
        },
        {
            id: 2,
            subjectId : 1,
            value: 2,
            text: 'IT-1B'
        },
        {
            id: 3,
            subjectId : 1,
            value: 3,
            text: 'IT-1C'
        },
        {
            id: 4,
            subjectId : 2,
            value: 1,
            text: 'IT-3A'
        },
        {
            id: 5,
            subjectId : 2,
            value: 2,
            text: 'IT-3C'
        },
        {
            id: 6,
            subjectId : 3,
            value: 1,
            text: 'IT-3D'
        },
        {
            id: 7,
            subjectId : 4,
            value: 1,
            text: 'IT-4B'
        },
        {
            id: 8,
            subjectId : 4,
            value: 1,
            text: 'IT-3D'
        },
    ]
   
    res.status(200).send(sectionList)
})
router.get('/roomList',(req,res)=>{
    const roomList = [
        {
            id: 1,
            text: 'AB1-201'
        },
        {
            id: 2,
            text: 'AB1-205'
        },
        {
            id: 3,
            text: 'AB1-203'
        },
        {
            id: 4,
            text: 'AB1-207'
        },
        {
            id: 5,
            text: 'AB1-204'
        }
    ]

})
router.get('/yearList',(req,res)=>{
    const yearList = [
        {
            id: 1,
            yearId: 1,
            sectionId: 1,
            text: 'IT-1A'
        },
        {
            id: 2,
            yearId: 1,
            sectionId: 2,
            text: 'IT-1B'
        },
        {
            id: 3,
            yearId: 1,
            sectionId: 3,
            text: 'IT-1C'
        },
        {
            id: 4,
            yearId: 1,
            sectionId: 4,
            text: 'IT-1D'
        },
        {
            id: 5,
            yearId: 2,
            sectionId: 1,
            text: 'IT-2A'
        },
        {
            id: 6,
            yearId: 2,
            sectionId: 2,
            text: 'IT-2B'
        },
        {
            id: 7,
            yearId: 2,
            sectionId: 3,
            text: 'IT-2C'
        },
        {
            id: 8,
            yearId: 2,
            sectionId: 4,
            text: 'IT-2D'
        },
        {
            id: 9,
            yearId: 3,
            sectionId: 1,
            text: 'IT-3A'
        },
        {
            id: 10,
            yearId: 3,
            sectionId: 2,
            text: 'IT-3B'
        },
        {
            id: 11,
            yearId: 3,
            sectionId: 3,
            text: 'IT-3C'
        },
        {
            id: 12,
            yearId: 3,
            sectionId: 4,
            text: 'IT-3D'
        },
        {
            id: 13,
            yearId: 4,
            sectionId: 1,
            text: 'IT-4A'
        },
        {
            id: 14,
            yearId: 4,
            sectionId: 2,
            text: 'IT-4B'
        },
        {
            id: 15,
            yearId: 4,
            sectionId: 3,
            text: 'IT-4C'
        },
        {
            id: 16,
            yearId: 4,
            sectionId: 4,
            text: 'IT-4D'
        }
      
    ]

    res.status(200).send(yearList)

})
router.get('/attendanceList',(req,res)=>{
  const attendanceList = [
    {
        id : 1,
        subjectId: '1',
        text: 'Fundamentals of Programming',
        sectionText: 'IT-1A',
        sectionId: '1',
        room: 'AB1-203'

    },
    {
        id : 2,
        subjectId: '1',
        text: 'Fundamentals of Programming',
        sectionText: 'IT-1A',
        sectionId: '1',
        room: 'AB1-204'

    },
    {
        id : 3,
        subjectId: '1',
        text: 'Fundamentals of Programming',
        sectionText: 'IT-1A',
        sectionId: '1',
        room: 'AB1-203'

    },
    {
        id : 5,
        subjectId: '1',
        text: 'Fundamentals of Programming',
        sectionText: 'IT-1B',
        sectionId: '2',
        room: 'AB1-205'

    },
    {
        id : 4,
        subjectId: '1',
        text: 'Fundamentals of Programming',
        sectionText: 'IT-1B',
        sectionId: '2',
        room: 'AB1-203'

    },
    {
        id : 6,
        subjectId: '1',
        text: 'Fundamentals of Programming',
        sectionText: 'IT-1C',
        sectionId: '3',
        room: 'AB1-203'

    },
    {
        id : 7,
        subjectId: '2',
        text: 'Information Assurance and Security 1',
        sectionText: 'IT-3C',
        sectionId: '2',
        room: 'AB1-203'

    },
    {
        id : 8,
        subjectId: '2',
        text: 'Information Assurance and Security 1',
        sectionText: 'IT-3C',
        sectionId: '2',
        room: 'AB1-205'

    },
    {
        id : 9,
        subjectId: '2',
        text: 'Information Assurance and Security 1',
        sectionText: 'IT-3A',
        sectionId: '1',
        room: 'AB1-203'

    },
    {
        id : 10,
        subjectId: '2',
        text: 'Information Assurance and Security 1',
        sectionText: 'IT-3A',
        sectionId: '1',
        room: 'AB1-206'

    },
    {
        id : 11,
        subjectId: '2',
        text: 'Information Assurance and Security 1',
        sectionText: 'IT-3A',
        sectionId: '1',
        room: 'AB1-203'

    },
  ]

  res.status(200).send(attendanceList)
})

module.exports = router;