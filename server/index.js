const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
//const formidable = require('formidable');
const { MongoClient, ObjectId, GridFSBucket } = require('mongodb');
const folderRoutes = require('./folderCreate');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cors());

app.use('/', folderRoutes);
// Mongo URI
const mongoURI = 'mongodb://localhost:27017/Medicine_and_Surgery';

// Create mongo connection
const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
let db;

// Connect to MongoDB
client.connect().then(() => {
  db = client.db('Medicine_and_Surgery'); // Replace with your database name
  gfs = new GridFSBucket(db, { bucketName: 'uploads' });
  console.log('MongoDB connected and GridFS initialized');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

 /* const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});  */



const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true },
  createdAt: { type: Date, default: Date.now }
});

const File = mongoose.model('File', fileSchema);





// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = path.basename(file.originalname);
      const folderId = req.body.folderId || null;
       console.log(folderId);
       // Get folderId from request body
      const fileInfo = {
        filename: filename,
        bucketName: 'uploads',
        metadata: { folderId: folderId } // Include folderId in metadata
      };
      resolve(fileInfo);
    });
  }
});

const upload = multer({ storage });

// Route to upload a file




app.post('/upload', (req, res) => {
  upload.single('file')(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    //console.log('File uploaded:', req.file);
    
  });
});

//Get folders
app.get("/folders", async(req,res)=>{
  try {
    const folders = await db.collection('folders').find({}).toArray();
    if (!folders || folders.length === 0) {
      return res.status(404).json({ err: 'No files found in this folder' });
    }
    res.json(folders);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: 'Internal server error' });
    
  }
})

// Route to get files in a specific folder
app.get('/files/folder/:folderId', async (req, res) => {
  const { folderId } = req.params;
  try {
    const files = await db.collection('uploads.files').find({
      'metadata.folderId': folderId
    }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ err: 'No files found in this folder' });
    }

    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Internal server error' });
  }
});



// Route to get a specific file from a folder
app.get('/files/folder/:folderId/:filename', async (req, res) => {
  const { folderId, filename } = req.params;
  try {
    const files = await db.collection('uploads.files').find({
      'metadata.folderId': folderId,
      'filename': filename
    }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ err: 'No file exists' });
    }

    const readstream = gfs.openDownloadStreamByName(filename);
    readstream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Internal server error' });
  }
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));
