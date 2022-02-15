const uploadCsv = require('express').Router()

const multer = require('multer')

const csv = require('csv-parser');

const fs = require('fs')

const User = require('../db/models/User');

const Profile = require('../db/models/Profile');

const bcrypt = require('bcrypt')


// the const "storage" save the file destination and their name  
const storage = multer.diskStorage({
    destination: `${__dirname}/../csv/`,
    filename: function (req, file, cb) {
        cb("", "index.csv");
    }
})

//middleware to read and upload the file
const upload = multer({
    storage: storage
})

// controler 
uploadCsv.post('/', upload.single('file'), async (req, res, next) => {
    const {
        file,
        body: { name }
    } = req;
    
    // res.send("se creo el archivo");

    const results = [];

    if(fs.existsSync(`${__dirname}/../csv/index.csv`)){
        try {
            // const fileCsv = fs.readdirSync(`${__dirname}/../csv`);
            // console.log(fileCsv);
            fs.createReadStream(`${__dirname}/..//csv/index.csv`)
            .pipe(csv({}))
            .on('data', (data)  => results.push(data))
            .on('end', () => {
                // console.log(results)
                const students = [];
                const mentors =[]

                for(var i =0; i<results.length; i++){
                    if(results[i].role === '1'){
                        students.push(results[i])
                    }else if(results[i].role === '4'){
                        mentors.push(results[i])
                    }
                }

                // console.log("los estudiantes son: ");
                // console.log(students)

                // console.log("los mentores son: ")
                // console.log(mentors)

                for(var i =0; i<students.length; i++){
                    const interestsStudents = []

                    const firstInterest = students[i].AreaMayorinteres.toUpperCase();

                    interestsStudents.push(firstInterest)

                    delete students[i].AreaMayorinteres

                    const secondInterest = students[i].Areadeinteresmedio.toUpperCase();

                    interestsStudents.push(secondInterest)

                    delete students[i].Areadeinteresmedio

                    const thirdInterest = students[i].Areaintresbajo.toUpperCase();

                    interestsStudents.push(thirdInterest)

                    delete students[i].Areaintresbajo

                    students[i].interestsStudent = interestsStudents;

                    delete students[i].numeStudents;
                }

                console.log("los estudiantes son: ");
                console.log(students)

                for(var i = 0; i < mentors.length; i++){
                    const interestsMentors = []

                    const firstInterest = mentors[i].AreaMayorinteres.toUpperCase();

                    interestsMentors.push(firstInterest)

                    delete mentors[i].AreaMayorinteres

                    const secondInterest = mentors[i].Areadeinteresmedio.toUpperCase();

                    interestsMentors.push(secondInterest)

                    delete mentors[i].Areadeinteresmedio

                    const thirdInterest = mentors[i].Areaintresbajo.toUpperCase();

                    interestsMentors.push(thirdInterest)

                    delete mentors[i].Areaintresbajo

                    mentors[i].interestsMentor = interestsMentors;

                }

                console.log("los mentores son: ")
                console.log(mentors)

                for (var i = 0; i < mentors.length; i++) {
                    try{
                        const profile = {
                            gender: Number(mentors[i].gender),
                            actualAge: Number(mentors[i].actualAge),
                            interestsMentor: mentors[i].interestsMentor,
                            numeStudents: Number(mentors[i].numeStudents),
                            commitment: Number(mentors[i].commitment),
                            achievementOrientation: Number(mentors[i].achievementOrientation),
                            flexibility: Number(mentors[i].flexibility),
                            assertiveCommunication: Number(mentors[i].assertiveCommunication),
                            studentsGenderPrefer: Number(mentors[i].studentsGenderPrefer)
                        }

                        let password = mentors[i].password

                        const salt = bcrypt.genSaltSync(12);
                        const passwordHash = bcrypt.hashSync(password, salt);


                        
                        if(passwordHash != null){
                            const newUser = new User({
                                name: mentors[i].name,
                                email: mentors[i].email,
                                password: passwordHash,
                                middleName: mentors[i].middleName,
                                lastName: mentors[i].lastName,
                                secondSurname: mentors[i].secondSurname,
                                contacNumber: Number(mentors[i].contacNumber),
                                role: Number(mentors[i].role),
                                program: mentors.program,
                                cohorte: Number(mentors[i].cohorte)
                            })
                
                            newUser.save()
                            .then(function (dbProfile) {
                                // If we were able to successfully create a Product, send it back to the client
                                // console.log(dbProfile)

                                // console.log(profile)
                                Profile.create({
                                    user_id: dbProfile._id,
                                    gender: profile.gender,
                                    actualAge: profile.actualAge,
                                    interestsMentor: profile.interestsMentor,
                                    numeStudents: profile.numeStudents,
                                    commitment: profile.commitment,
                                    achievementOrientation: profile.achievementOrientation,
                                    flexibility: profile.flexibility,
                                    assertiveCommunication: profile.assertiveCommunication,
                                    studentsGenderPrefer: profile.studentsGenderPrefer
                                })
                                // res.json(dbProfile)
                            })
                            .catch(function (err) {
                                console.error(err)
                            })
                        }
                        
            
                        
                    }catch(err){
                        console.error(err)
                    }
                }

                for (var i = 0; i < students.length; i++) {
                    try{
                        const profile = {
                            gender: Number(students[i].gender),
                            actualAge: Number(students[i].actualAge),
                            interestsStudent: students[i].interestsStudent,
                            commitment: Number(students[i].commitment),
                            achievementOrientation: Number(students[i].achievementOrientation),
                            flexibility: Number(students[i].flexibility),
                            assertiveCommunication: Number(students[i].assertiveCommunication),
                            studentsGenderPrefer: Number(students[i].studentsGenderPrefer)
                        }

                        let password = students[i].password

                        const salt = bcrypt.genSaltSync(12);
                        const passwordHash = bcrypt.hashSync(password, salt);


                        
                        if(passwordHash != null){
                            const newUser = new User({
                                name: students[i].name,
                                email: students[i].email,
                                password: passwordHash,
                                middleName: students[i].middleName,
                                lastName: students[i].lastName,
                                secondSurname: students[i].secondSurname,
                                contacNumber: Number(students[i].contacNumber),
                                role: Number(students[i].role),
                                program: students.program,
                                cohorte: Number(students[i].cohorte)
                            })
                
                            newUser.save()
                            .then(function (dbProfile) {
                                // If we were able to successfully create a Product, send it back to the client
                                // console.log(dbProfile)

                                // console.log(profile)
                                Profile.create({
                                    user_id: dbProfile._id,
                                    gender: profile.gender,
                                    actualAge: profile.actualAge,
                                    interestsStudent: profile.interestsStudent,
                                    commitment: profile.commitment,
                                    achievementOrientation: profile.achievementOrientation,
                                    flexibility: profile.flexibility,
                                    assertiveCommunication: profile.assertiveCommunication,
                                    studentsGenderPrefer: profile.studentsGenderPrefer
                                })
                                // res.json(dbProfile)
                            })
                            .catch(function (err) {
                                console.error(err)
                            })
                        }
                        
            
                        
                    }catch(err){
                        console.error(err)
                    }
                }

                res.status(200).json({ msg: 'usuario guardado' })
            });
        } catch(err) {
            console.error(err)
        }
    }
    
    // console.log(results.length)

    // if(results.length >= 1){
        
    // }

    
    


    
})

module.exports = {
    uploadCsv
}

