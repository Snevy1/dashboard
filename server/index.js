const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
const { MongoClient, ObjectId, GridFSBucket } = require('mongodb');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Static folder
app.use(express.static('public'));
app.use(cors())


// Mongo URI
const mongoURI = 'mongodb://localhost:27017/firstFiles';

// Create mongo connection
const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
let db;

// Connect to MongoDB
client.connect().then(() => {
  db = client.db('firstFiles'); // Replace with your database name
  gfs = new GridFSBucket(db, { bucketName: 'uploads' });
  console.log('MongoDB connected and GridFS initialized');

}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = path.basename(file.originalname);
      const fileInfo = {
        filename: filename,
        bucketName: 'uploads',
      };
      resolve(fileInfo);
    });
  }
});

const upload = multer({ storage });

// @route POST /upload
// @desc Uploads file to DB
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

// @route GET /files
// @desc Display all files in JSON
app.get('/files', async (req, res) => {
  try {
    const files = await db.collection('uploads.files').find({}).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist',
      });
    }
    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Internal server error' });
  }
});

// @route GET /image/:filename
// @desc Display image
app.get('/image/:filename', (req, res) => {
  db.collection('uploads.files').findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.openDownloadStreamByName(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image',
      });
    }
  });
});

// @route DELETE /files/:id
// @desc Delete file
app.delete('/files/:id', (req, res) => {
  const fileId = new ObjectId(req.params.id);
  gfs.delete(fileId, (err) => {
    if (err) {
      return res.status(404).json({ err: err.message });
    }
    res.redirect('/');
  });
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));





















/* const express = require('express')
//const cors = require('cors')
//app.use(cors())
const app = express()

app.use(express.json())
app.post('/upload', upload.array('files'), (req,res)=>{
    console.log(req.body)
    console.log(res.file)
})

app.listen(5000, ()=>{
    console.log("server is running!");
}) */