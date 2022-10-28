
const router = require('express').Router();


router.get('/',(req,res)=>{
    const studentList = [
        {
            id: 1,
            campus: 'Urdaneta',
            idNumber: '22-UR-9928',
            department: 'College of Computing',
            fullName: 'Jenny Cruz',
            gender: 'Female',
            phoneNumber: '+639210293847',
            email: 'email@example.com',
            course: 'BS Math',
            address: 'Bry Matibag Pampanga',
            image : 'pic.jpg'
    
        },
        {
            id: 2,
            campus: 'Urdaneta',
            idNumber: '21-UR-1022',
            department: 'Engineering',
            fullName: 'Jenny Cruz',
            gender: 'Female',
            phoneNumber: '+639210293847',
            email: 'email@example.com',
            course: 'Civil Engineering',
            address: 'Zone 2 San Manuel Tarlac',
            image : 'sample.jpg'
    
        },
        {
            id: 2,
            campus: 'Urdaneta',
            idNumber: '19-UR-1324',
            department: 'College of Computing',
            fullName: 'Jean Doe',
            gender: 'Female',
            phoneNumber: '+6394566788',
            email: 'email@example.com',
            course: 'Mechanical Engineering',
            address: 'Zone 9 San Juan Moncada Tarlac',
            image : 'pic.jpg'
    
        },
        {
            id: 3,
            campus: 'Urdaneta',
            idNumber: '18-UR-1234',
            department: 'College of Computing',
            fullName: 'Pierre Bouvier',
            gender: 'Male',
            phoneNumber: '+6398837229',
            email: 'email@example.com',
            course: 'BS Information Technology',
            address: 'Zone 5 Urdaneta Pangasinan',
            image : 'pierre.jpg'
    
        }
    ]
    
    res.status(200).send(studentList)
})

router.get('/staffList',(req,res)=>{
    const staffList = [
        {
            id: 1,
            idNumber: '21-UR-1238',
            depId: '1',
            department: 'College of Computing',
            fullName: 'Mariana Dela Vega',
            gender: 'Female',
            phoneNumber: '+639210293847',
            email: 'email@example.com',
            address: 'Bry Matibag Pampanga',
        },
        {
            id: 2,
            idNumber: '12-UR-0903',
            depId: '1',
            department: 'College of Computing',
            fullName: 'Ben Vera',
            gender: 'Male',
            phoneNumber: '+6397347329',
            email: 'email@example.com',
            address: 'San Antonio Nueva Ecija',
        },
        {
            id: 3,
            idNumber: '22-UR-1222',
            depId: '2',
            department: 'Education',
            fullName: 'Elaine Gascon',
            gender: 'Female',
            phoneNumber: '+639210293847',
            email: 'email@example.com',
            address: 'Bry Sta Ana Manila',
        },
        {
            id: 4,
            idNumber: '13-UR-1211',
            depId: '3',
            department: 'Engineering',
            fullName: 'Kate Sangal',
            gender: 'Female',
            phoneNumber: '+639210293847',
            email: 'email@example.com',
            address: 'Bry San Gabriel Valenzuela',
        },
        {
            id: 5,
            idNumber: '11-UR-4321',
            depId: '3',
            department: 'Engineering',
            fullName: 'Eunice Macaspal',
            gender: 'Female',
            phoneNumber: '+639377399',
            email: 'email@example.com',
            address: 'Bry San Felipe San Manuel',
        },
    ]
    res.status(200).send(staffList)
})
router.get('/studentList',(req,res)=>{
    const studentList = [
        {
            id: 1,
            idNumber: '21-UR-1238',
            courseId: '1',
            course: 'Civil Engineering',
            fullName: 'Mariana Dela Vega',
            gender: 'Female',
            phoneNumber: '+639210293847',
            email: 'email@example.com',
            address: 'Bry Matibag Pampanga',
        },
        {
            id: 2,
            idNumber: '12-UR-0903',
            courseId: '1',
            course: 'Civil Engineering',
            fullName: 'Ben Vera',
            gender: 'Male',
            phoneNumber: '+6397347329',
            email: 'email@example.com',
            address: 'San Antonio Nueva Ecija',
        },
        {
            id: 3,
            idNumber: '22-UR-1222',
            courseId: '2',
            course: 'Information Technology',
            fullName: 'Elaine Gascon',
            gender: 'Female',
            phoneNumber: '+639210293847',
            email: 'email@example.com',
            address: 'Bry Sta Ana Manila',
        },
        {
            id: 4,
            idNumber: '13-UR-1211',
            courseId: '2',
            course: 'Information Technology',
            fullName: 'Kate Sangal',
            gender: 'Female',
            phoneNumber: '+639210293847',
            email: 'email@example.com',
            address: 'Bry San Gabriel Valenzuela',
        },
        {
            id: 5,
            idNumber: '11-UR-4321',
            courseId: '3',
            course: 'Mathematics',
            fullName: 'Eunice Macaspal',
            gender: 'Female',
            phoneNumber: '+639377399',
            email: 'email@example.com',
            address: 'Bry San Felipe San Manuel',
        },
    ]
    res.status(200).send(studentList)
})

router.get('/courses',(req,res)=>{
   const courseList = [
    {
        id : 1,
        description: 'BS Civil Engineering'
    },
    {
        id : 2,
        description: 'BS Computer Engineering'
    },
    {
        id : 3,
        description: 'Bachelor of Early Childhood Education'
    },
    {
        id : 4,
        description: 'BS Electrical Engineering'
    },
    {
        id : 5,
        description: 'AB English Language'
    },
    {
        id : 6,
        description: 'BS Information Technology'
    },
    {
        id : 7,
        description: 'BS Mathematics'
    },
   ]
   res.status(200).send(courseList)
})
router.get('/departments',(req,res)=>{
    const departmentList = [
     {
         id : 1,
         description: 'College of Computing'
     },
     {
         id : 2,
         description: 'Education'
     },
     {
         id : 3,
         description: 'Engineering'
     },
   
    ]
    res.status(200).send(departmentList)
 })
router.get('/rooms',(req,res)=>{
    const roomList = [
     {
         id : 1,
         description: 'AB1-201'
     },
     {
         id : 2,
         description: 'AB1-202'
     },
     {
         id : 3,
         description: 'AB1-203'
     },
     {
         id : 4,
         description: 'AB2-201'
     },
     {
         id : 5,
         description: 'AB2-202'
     },
     {
         id : 6,
         description: 'AB2-203'
     }
    ]
    res.status(200).send(roomList)
 })
router.get('/classList',(req,res)=>{
    const classList = [
     {
         id : 1,
         academicYear: '1',
         semester: '1',
         course: 'BS IT',
         yearLevel:'FIrst Year',
         name: 'CC 101',
         section: '1A'
     }
    ]
    res.status(200).send(classList)
 })

module.exports = router;

