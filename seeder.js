// seeder.js

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');
const Student = require('./Models/Student');
const Course = require('./Models/Course');
const StudentCourse = require('./Models/StudentCourse');

// DB bağlantısı
const MONGO_URI = 'mongodb+srv://voidsoftware:voidsoftware@studentclassprogram.0z7spp3.mongodb.net/';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB bağlantısı kuruldu.');

    // Önce tüm koleksiyonları temizle
    await Student.deleteMany();
    await Course.deleteMany();
    await StudentCourse.deleteMany();

    // 1. Öğrenci Oluşturma
    const studentList = [];
    for (let i = 1; i <= 100; i++) {
      studentList.push(new Student({
        Name: faker.person.firstName(),
        Surname: faker.person.lastName(),
        Phone: faker.phone.number(),
        StudentNumber: `2025${i.toString().padStart(4, '0')}`,
        Email: faker.internet.email(),
      }));
    }
    const students = await Student.insertMany(studentList);
    console.log('10 öğrenci eklendi');

    // 2. Kurs Oluşturma
    // 20 adet ders verisi ekle (Matematik ve Bilgisayar Bilimleri)
    const mathCourses = [
      'Lineer Cebir',
      'Analitik Geometri',
      'Diferansiyel Denklemler',
      'İstatistik',
      'Kombinatorik',
      'Soyut Cebir',
      'Gerçek Analiz',
      'Sayısal Analiz',
      'Matematiksel Mantık',
      'Topoloji'
    ];

    const csCourses = [
      'Veri Yapıları',
      'Algoritmalar',
      'Veritabanı Sistemleri',
      'İşletim Sistemleri',
      'Bilgisayar Mimarisi',
      'Yapay Zeka',
      'Makine Öğrenmesi',
      'Web Programlama',
      'Mobil Programlama',
      'Siber Güvenlik'
    ];

    // Her derse uygun saat ve kod bilgisi ekleniyor
    const allCourses = [...mathCourses, ...csCourses].map((name, index) => {
      const startHour = 8 + (index % 10); // 08:00 - 17:00 arasında
      const isMath = index < 10;

      return new Course({
        Name: name,
        DayOfWeek: (index % 5) + 1, // Pazartesi - Cuma (1-5)
        CourseCode: isMath ? `MATH${100 + index}` : `CSE${100 + index - 10}`,
        StartTime: new Date(2025, 0, 1, startHour, 0),
        EndTime: new Date(2025, 0, 1, startHour + 1, 0),
      });
    });

    // MongoDB'ye ekle
    const courses = await Course.insertMany(allCourses);
    console.log('20 ders başarıyla eklendi.');


    // 3. Öğrenci - Kurs eşlemesi
    const studentCourseList = [];
    for (const student of students) {
      const assignedCourses = faker.helpers.shuffle(courses).slice(0, Math.floor(Math.random() * 2) + 2); // 2-3 kurs
      for (const course of assignedCourses) {
        studentCourseList.push({
          studentId: student._id,
          courseId: course._id,
        });
      }
    }

    await StudentCourse.insertMany(studentCourseList);
    console.log(`${studentCourseList.length} öğrenci-kurs ilişkisi eklendi`);

  } catch (error) {
    console.error('Seeder hatası:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB bağlantısı kapatıldı.');
  }
}

seed();
