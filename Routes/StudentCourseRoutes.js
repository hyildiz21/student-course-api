const express = require('express');
const router = express.Router();
const studentCourseQueries = require('../Queries/StudentCourseQuery');

// Tüm kayıtları getir (isteğe göre: öğrenciye ait kurslar)
router.get('/getByStudent/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const records = await studentCourseQueries.getCoursesByStudentId(studentId);

    if (!records || records.length === 0) {
      return res.status(404).json({ message: 'Bu öğrenciye ait kurs bulunamadı' });
    }

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Belirli bir ilişki kaydını getir (ID'ye göre)
router.get('/getById/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const record = await studentCourseQueries.getStudentCourseById(id);

    if (!record) {
      return res.status(404).json({ message: 'Kayıt bulunamadı' });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Yeni ilişki oluştur
router.post('/add', async (req, res) => {
  try {
    const data = req.body;
    const newRecord = await studentCourseQueries.createStudentCourse(data);
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Güncelle
router.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updated = await studentCourseQueries.updateStudentCourse(id, updatedData);

    if (!updated) {
      return res.status(404).json({ message: 'Güncellenecek kayıt bulunamadı' });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sil
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await studentCourseQueries.deleteStudentCourse(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Silinecek kayıt bulunamadı' });
    }

    res.json({ message: 'Kayıt başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
