const uploadCsv = require('express').Router()

const multer = require('multer')

const csv = require('csv-parser');

const fs = require('fs')

const User = require('../db/models/User');

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
                
                for (var i = 0; i < results.length; i++) {
                    try{
                        let password = results[i].password

                        const salt = bcrypt.genSaltSync(12);
                        const passwordHash = bcrypt.hashSync(password, salt);
                        
                        if(passwordHash != null){
                            const newUser = new User({
                                name: results[i].name,
                                email: results[i].email,
                                password: passwordHash,
                                middleName: results[i].middleName,
                                lastName: results[i].lastName,
                                secondSurname: results[i].secondSurname,
                                contacNumber: Number(results[i].contacNumber),
                                role: Number(results[i].role),
                            })
                
                            newUser.save()
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

