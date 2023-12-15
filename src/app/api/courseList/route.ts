import { Course } from "@/models/course"
import mongoose from "mongoose"
import { cookies } from  'next/headers'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/courseList', (req, res) => {
  const userName = req.body.userName;
  mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management");
  // Thực hiện logic để lấy danh sách khóa học dựa trên userName
  const courses = Course.find({student_id:{$in: userName}})
  console.log(courses)

  // Trả về danh sách khóa học dưới dạng JSON
  res.json(courses);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});