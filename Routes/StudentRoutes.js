const express = require('express');
const router = express.Router();
const studentQueries = require('../Queries/StudentQuery');

//getAll
router.get('/getAll', authenticateToken, async (req, res) => {
  console.log('Route başladı');
  try {
    const students = await studentQueries.getAllStudents();
    console.log('Veri başarıyla alındı:', students.length, 'kayıt');
    res.json(students);
  } catch (error) {
    console.error('Route hata verdi:', error);
    res.status(500).json({ error: error.message });
  }
});


//getById
router.get('/getById/:id', async (req, res) => {
  console.log('Route başladı');
  const studentId = req.params.id; // URL'den id'yi alıyoruz

  try {
    const student = await studentQueries.getStudentById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Öğrenci bulunamadı' });
    }
    console.log('Veri başarıyla alındı:', student);
    res.json(student);
  } catch (error) {
    console.error('Route hata verdi:', error);
    res.status(500).json({ error: error.message });
  }
});

//add
router.post('/add', async (req, res) => {
  console.log('Route başladı: add');
  const studentData = req.body;

  try {
    const newStudent = await studentQueries.addStudent(studentData);
    console.log('Öğrenci başarıyla eklendi:', newStudent);
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Route hata verdi:', error);
    res.status(500).json({ error: error.message });
  }
});

//update
router.put('/update/:id', async (req, res) => {
  console.log('Route başladı: update');
  const studentId = req.params.id;
  const updateData = req.body;

  try {
    const updatedStudent = await studentQueries.updateStudent(studentId, updateData);
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Güncellenecek öğrenci bulunamadı' });
    }
    console.log('Öğrenci başarıyla güncellendi:', updatedStudent);
    res.json(updatedStudent);
  } catch (error) {
    console.error('Route hata verdi:', error);
    res.status(500).json({ error: error.message });
  }
});

//delete
router.delete('/delete/:id', async (req, res) => {
  console.log('Route başladı: delete');
  const studentId = req.params.id;

  try {
    const deletedStudent = await studentQueries.deleteStudent(studentId);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Silinecek öğrenci bulunamadı' });
    }
    console.log('Öğrenci başarıyla silindi:', deletedStudent);
    res.json({ message: 'Öğrenci silindi', data: deletedStudent });
  } catch (error) {
    console.error('Route hata verdi:', error);
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
