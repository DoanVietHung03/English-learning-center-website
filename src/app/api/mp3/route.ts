const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Kết nối MongoDB
mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Định nghĩa schema cho collection mp3
const mp3Schema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

const MP3 = mongoose.model('MP3', mp3Schema);

// Sử dụng multer để xử lý upload mp3
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint để upload mp3
app.post('/upload', upload.single('mp3'), async (req, res) => {
  try {
    const newMP3 = new MP3({
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });
    console.log("aaaaaaaaaaaaaaa")
    await newMP3.save();

    res.status(201).json({ message: 'MP3 uploaded successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
