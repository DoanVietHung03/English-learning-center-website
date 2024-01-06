// app.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
const gfs = Grid(conn.db);

// Set up GridFS storage engine using multer-gridfs-storage
const storage = new GridFsStorage({
  url: "mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management",
  file: (req, file) => {
    return {
      bucketName: 'uploads', // Name of your collection
      filename: file.originalname,
    };
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('audio'), (req, res) => {
  console.log('Audio uploaded successfully')
  res.status(201).send('Audio uploaded successfully');

});

app.get('/audio/:filename', (req, res) => {
  const readstream = gfs.createReadStream({ filename: req.params.filename });
  readstream.pipe(res);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
