const router = require('express').Router();
const bcrypt = require('bcrypt')

router.get('/campusList',(req,res)=>{
    const campusList = [
        {
            id: '1',
            text: 'Asingan',
            address: 'Domanpot, Asingan, Pangasinan',
            contact: '+63 75 562 5581'
        },
        {
            id: '4',
            text: 'Lingayen',
            address: 'Alvear E, Poblacion, Lingayen, 2401 Pangasinan',
            contact: '(073) 324 5678'
        },
        {
            id: '2',
            text: 'Sta Maria',
            address: 'Ciangao, Sta. Maria, Pangasinan',
            contact: '(721) 937 3746'
        },
        {
            id: '3',
            text: 'Urdaneta',
            address: 'McArthur Highway, Barangay San Vicente, Urdaneta City Pangasinan',
            contact: '(723) 366 3838'
        }
    ]
    res.status(200).send(campusList);
})

router.get('/positionList',(req,res)=>{
    const positionList = [
        {
            id: '1',
            text: 'Non-Teaching'
        },
        {
            id: '2',
            text: 'Teaching Staff'
        },
        {
            id: '3',
            text: 'Security'
        }
    ]
    res.status(200).send(positionList);
})

router.get('/departmentList',(req,res)=>{
    const departmentList = [
        {
            id: '1',
            text: 'AB-English'
        },
        {
            id: '2',
            text: 'College of Computing'
        },
        {
            id: '3',
            text: 'Education'
        },
        {
            id: '4',
            text: 'Engineering'
        }
    ]
    res.status(200).send(departmentList);
})

router.get('/courseList',(req,res)=>{
    const courseList = [
        {
            id: '1',
            text: 'BS Information Technology'
        },
        {
            id: '2',
            text: 'BS Math'
        },
        {
            id: '3',
            text: 'Civil Engineering'
        },
        {
            id: '4',
            text: 'Mechanical Engineering'
        }
    ]
    res.status(200).send(courseList);
})
router.get('/purposeList',(req,res)=>{
    const purposeList = [
        {
            id: '1',
            text: 'College Application'
        },
        {
            id: '2',
            text: 'Claim Transcript of Record'
        },
        {
            id: '3',
            text: 'Entrance Examination'
        },
        {
            id: '4',
            text: 'Just Visiting'
        }
    ]
    res.status(200).send(purposeList);
})

router.post('/login',(req,res)=>{
    let accountId = 0;
    const accounts = [
        {
            id:1,
            username: 'sudo',
            password: '12345678'
        },
        {
            id:2,
            username: 'campus-admin',
            password: '12345678'
        },
        {
            id:3,
            username: 'student-001',
            password: '12345678'
        },
        {
            id:4,
            username: 'guest-001',
            password: '12345678'
        },
        {
            id:5,
            username: 'instructor-001',
            password: '12345678'
        },
        {
            id:6,
            username: 'non-teaching',
            password: '12345678'
        },
        {
            id:7,
            username: 'sg-001',
            password: '12345678'
        }
    ]

     for(let account of accounts){
        if(account.username === req.body.username && account.password === req.body.password){
            accountId = account.id
            break;
        }
     }
    
     res.status(200).send(accountId.toString())
})

router.get('/staffList',(req,res)=>{
    const staffList = [
        {
            id: 1,
            campus: 'Asingan',
            idNumber: '11-AS-9928',
            department: 'College of Computing',
            firstName: 'John',
            lastName: 'Doe',
            gender: 'Male',
            phoneNumber: '+639210293847',
            email: 'email@example.com',
            isAdmin: 0

        },
        {
            id: 2,
            campus: 'Sta Maria',
            idNumber: '12-SM-1021',
            department: 'AB English',
            firstName: 'Shaira',
            lastName: 'Cruz',
            gender: 'Female',
            phoneNumber: '+63999303892',
            email: 'email@example.com',
            isAdmin: 1

        },
        {
            id: 3,
            campus: 'Urdaneta',
            idNumber: '10-UR-6422',
            department: 'Education',
            firstName: 'Jeff',
            lastName: 'Stinco',
            gender: 'Male',
            phoneNumber: '+63928837223',
            email: 'email@example.com',
            isAdmin: 1

        },
        {
            id: 4,
            campus: 'Lingayen',
            idNumber: '18-LI-3262',
            department: 'College of Computing',
            firstName: 'Steven',
            lastName: 'Thompson',
            gender: 'Male',
            phoneNumber: '+63921773632',
            email: 'email@example.com',
            isAdmin: 1

        },
        {
            id: 5,
            campus: 'Lingayen',
            idNumber: '20-LI-9953',
            department: 'Engineering',
            firstName: 'Kate',
            lastName: 'Dela Vega',
            gender: 'Female',
            phoneNumber: '+6938372622',
            email: 'email@example.com',
            isAdmin: 0

        },
        {
            id: 6,
            campus: 'Urdaneta',
            idNumber: '13-UR-9736',
            department: 'College of Computing',
            firstName: 'George',
            lastName: 'Dela Cruz',
            gender: 'Male',
            phoneNumber: '+639287373',
            email: 'email@example.com',
            isAdmin: 0

        },
        {
            id: 7,
            campus: 'Sta Maria',
            idNumber: '16-SM-3884',
            department: 'Education',
            firstName: 'John',
            lastName: 'Doe',
            gender: 'Male',
            phoneNumber: '+699302833',
            email: 'email@example.com',
            isAdmin: 1

        }
    ]
    res.status(200).send(staffList)
})

router.get('/download',(req,res)=>{
    res.download('../server/files/myqr.png')
})



router.get('/user',async (req,res)=>{
    let person;
    const studentList = [
        {
            id: 1,
            campus: 'Urdaneta',
            idNumber: '22-UR-9928',
            department: 'College of Computing',
            firstName: 'Jenny',
            lastName: 'Cruz',
            gender: 'Female',
            phoneNumber: '+639210293847',
            email: 'email@example.com',
            course: 'BS Math',
            address: 'Zone 2 San Manuel Tarlac',
            image : 'img.jpg',
            hash: '$2b$10$Q0iot1oPYJgVBTL7dT84neiSu.xquJHFKhkHvJzyoke/llhgWWDA6'

        },
        {
            id: 2,
            campus: 'Urdaneta',
            idNumber: '19-UR-1324',
            department: 'College of Computing',
            firstName: 'Jean',
            lastName: 'Doe',
            gender: 'Female',
            phoneNumber: '+6394566788',
            email: 'email@example.com',
            course: 'Mechanical Engineering',
            address: 'Zone 9 San Juan Moncada Tarlac',
            image : 'pic.jpg',
            hash: '$2b$10$HodYjqGmsfz.BGPKuTbJeuoxQi7lOpxCVHtTKbi1nk/PByYu9sBx6'

        },
        {
            id: 3,
            campus: 'Urdaneta',
            idNumber: '18-UR-1234',
            department: 'College of Computing',
            firstName: 'Pierre ',
            lastName: 'Bouvier',
            gender: 'Male',
            phoneNumber: '+6398837229',
            email: 'email@example.com',
            course: 'BS Information Technology',
            address: 'Zone 5 Urdaneta Pangasinan',
            image : 'pierre.jpg',
            hash : '$2b$10$D7ZIs0dqDdBsjmmkG44oKu/ekkVU4H81zhqWKANDW3Eu3ro8/pFOG'

        }
    ]
    studentList.forEach(student=>{
        if(req.query.hash == student.hash){
            person = student;
        }
    })
    console.log(person)
    res.status(200).send(person)
})
module.exports = router;