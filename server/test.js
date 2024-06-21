const express = require('express')
const multer = require('multer')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())

 app.use(express.static('./public'))
 app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './index.html'));
})  


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //cb(null, __dirname + '/tmp/my-uploads')
      cb(null, __dirname + "/uploads")
    },
    filename: function (req, file, cb) {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      //cb(null, file.fieldname + '-' + uniqueSuffix)
      cb(null, file.originalname);

    }
  })

//const uploads = multer({ dest: __dirname + '/uploads' })

const uploads = multer({ storage: storage })


app.post("/uploads", uploads.array("files"), (req,res)=>{
    console.log(req.body);
    //console.log(req.files)
    res.json({status: "files received!"})

})

app.listen(8000, ()=>{
    console.log('server is running!');
    console.log(__dirname)
})

