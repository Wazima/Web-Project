const express = require('express');
const router = express.Router();
const passport = require('passport');
const Courses = require('../../models/Courses');
const Users = require('../../models/Users');
const EnrolledCourses = require('../../models/EnrolledCourses');
const validateCourseInput = require('../../validation/addCourse');
const validateEnrollStudent = require('../../validation/enrollStudent');
const Assessments = require('../../models/Assessments');

//@route api/courses/test
//@desc test user route
//@access Public
router.get('/test',(req,res) =>{
    res.json({msg: "Courses Works"})
});
router.get('/getCourse', passport.authenticate('jwt',{session: false}),(req,res) =>{
    Courses.find({}).then(courses =>{
        res.status(200).json(courses)
    }).catch(err =>{
        res.status(400).json(err)
    })
})
router.post('/removeCourse', passport.authenticate('jwt',{session: false}),(req,res) =>{
    if(req.user.username != 'Admin') return res.status(401).json({user: "Unauthorized User"})
    Courses.deleteOne({id: req.body.id}).then(courses =>{
        res.status(200).json(courses)
    }).catch(err =>{
        res.status(400).json(err)
    })
})

router.post('/addCourse', passport.authenticate('jwt',{session: false}),(req,res) =>{
    if(req.user.username != 'Admin') return res.status(401).json({user: "Unauthorized User"})
    console.log(req.body);
    let { errors, isValid } = validateCourseInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Courses.findOne({id: req.body.id})
            .then(course =>{
                if(course){
                    res.status(400).json({course: "course id already exists"})
                }
                else{
                    const newCourse = new Courses({
                        name: req.body.name,
                        id: req.body.id,
                        instructor: req.body.instructor,
                        difficulty: req.body.difficulty,
                        duration: req.body.duration
                    })
                    newCourse
                        .save()
                        .then(course => res.json(course))
                        .catch(err => console.log(err));
                }
        });
});
router.post('/enrollLearner',  passport.authenticate('jwt',{session: false}), (req,res) =>{
    let {errors, isValid} = validateEnrollStudent(req.body);
    if(!isValid){
        res.status(400).json(errors);
    }
    Users.findOne({username: req.body.learnerID}).then(user =>{
        if(!user){
            res.status(404).json({user: "User not found"})
        }
        Courses.findOne({id: req.body.courseID}).then(course =>{
            if(!course){
                res.status(404).json({course: "course not found"})
            }

            const newEnroll = new EnrolledCourses({
                enrollmentID:req.body.enrollmentID,
                learnerID: user._id,
                courseID: course._id
            })
            newEnroll
                .save()
                .then(enroll => res.json(enroll))
                .catch(err => console.log(err));

        })
    })
})
router.post('/enrollLearner2',  passport.authenticate('jwt',{session: false}), (req,res) =>{
    
    Users.findOne({username: req.user.username}).then(user =>{
        if(!user){
            res.status(404).json({user: "User not found"})
        }
        Courses.findOne({id: req.body.courseID}).then(course =>{
            if(!course){
                res.status(404).json({course: "course not found"})
            }
            const newEnrollment = req.user.username.slice(0,3) + req.body.courseID.slice(0,3)
            const newEnroll = new EnrolledCourses({
                enrollmentID: newEnrollment,
                learnerID: user._id,
                courseID: course._id
            })
            newEnroll
                .save()
                .then(enroll => res.json(enroll))
                .catch(err => console.log(err));

        })
    })
})
//@route /api/courses/attachAssessment
//@desc add assessment to an enrolled course
//@access Private 
router.post("/attachAssessment",  passport.authenticate('jwt',{session: false}), (req,res) =>{
    if(req.user.username != 'Admin') return res.status(401).json({user: "Unauthorized User"})
    console.log(req.body)
    EnrolledCourses.findOne({enrollmentID:req.body.enrollmentID}).then((enrolled) =>{
        if(!enrolled) return res.status(404).json({enrollment: "invalid enrollment ID; not found"})
        Assessments.findOne({id :req.body.assessmentID}).then(assessment =>{
            if(!assessment) return res.status(404).json({assessment: "assessment not found"})
            EnrolledCourses.updateOne({
                _id: enrolled._id,
                $push: {Assessments:{
                    assessment: assessment._id,
                    weightage: req.body.weightage
                }}
            }).then(collection => {return res.status(200).json(collection)})
            .catch(err =>{
                return res.status(400).json(err)
            })
        })
    })
})
router.get('/getEnrollment', passport.authenticate('jwt',{session: false}),(req,res) =>{
    if(req.user.username != 'Admin') return res.status(401).json({user: "Unauthorized User"})
    EnrolledCourses.find({}).then(courses =>{
        console.log(courses)
        res.status(200).json(courses)
        
    }).catch(err =>{
        res.status(400).json(err)
    })
})
router.get('/getName',passport.authenticate('jwt',{session: false}),(req,res)=>{
    Users.findOne({_id: req.body.id}).then(course =>{
        if(!course) return res.status(200).json({id: "course deleted"})
        return res.status(200).json(course.id)
    })
})
module.exports = router;