const uploadCsv = require('express').Router()

const multer = require('multer')
// the const storage  
const storage = multer.diskStorage({
    destination: `${__dirname}/../csv/`,
    filename: function (req, file, cb) {
        cb("", "index.csv");
    }
})

const upload = multer({
    storage: storage
})



// const csv = require('csv-parser');


uploadCsv.post('/', upload.single('file'), async (req, res, next) => {
    const {
        file,
        body: { name }
    } = req;
    console.log(file)
    // console.log(file.type)
    
    // if (file.detectedFileExtension != ".csv") next(new Error("invalid file type"));

    // const fileName = name + file.detectedFileExtension

    // await pipeline(
    //     file.stream, 
    //     fs.createWriteStream(`${__dirname}/../csv/${fileName}`))
    // console.log(__dirname)
    
    res.send("se creo el archivo")
    if(res.send = "se creo el archivo"){

    }
    
    
})

// const results = [];

// const file = fs.readdirSync("../csv");


// fs.createReadStream(`../csv/${file[0]}`)
//     .pipe(csv({}))
//     .on('data', (data)  => results.push(data))
//     .on('end', () => {
//         console.log(results);
//     });

module.exports = {
    uploadCsv
}

