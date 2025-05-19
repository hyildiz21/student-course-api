const express = require('express');
const router = express.Router();
 //db işlemleri Querylerden
const courseQueries = require('../Queries/CourseQuery');

//Route işlemleri

// getAll
router.get('/getAll', async (req, res) => {
  try {
   
    const courses = await courseQueries.getAllCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST route — courseQueries içindeki createCourse fonksiyonunu kullanıyoruz
router.post('/add', async (req, res) => {
  try {
    const courseData = req.body;
    const savedCourse = await courseQueries.createCourse(courseData);
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// getbyId
router.get('/getById/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await courseQueries.getCourseById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Kurs bulunamadı' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update
router.put('/update/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatedData = req.body;

    const updatedCourse = await courseQueries.updateCourse(courseId, updatedData);

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Güncellenecek kurs bulunamadı' });
    }

    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete
router.delete('/delete/:id', async (req, res) => {
  try {
    const courseId = req.params.id;

    const deletedCourse = await courseQueries.deleteCourse(courseId);

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Silinecek kurs bulunamadı' });
    }

    res.json({ message: 'Kurs başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;

