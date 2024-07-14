
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/Medicine_and_Surgery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Folder Schema and Model
const folderSchema = new mongoose.Schema({
  name: String,
  userId: String, // Assuming userId should be a string
});

const Folder = mongoose.model('Folder', folderSchema);

// Route to create a folder
router.post('/folders', (req, res) => {
  const { name, userId } = req.body;
  console.log(req.body.name, req.body.userId);
  const folder = new Folder({ name, userId });
  console.log(folder);
  folder.save()
    .then(() => res.status(201).json(folder))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;










/* const folderSchema = new mongoose.Schema({
    name: String,
    userId: String, // Changed to String
  });

app.post('/folders', (req, res) => {
    const { name, userId } = req.body;
      console.log(req.body.name, req.body.userId)
    const folder = new Folder({ name, userId });
    console.log(folder);
    folder.save()
      .then(() => res.status(201).json(folder))
      .catch(err => res.status(400).json('Error: ' + err));
  }); */