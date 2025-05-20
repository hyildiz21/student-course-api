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
    for (let i = 1; i <= 10; i++) {
      studentList.push(new Student({
        StudentId: uuidv4(),
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
    const courseNames = ['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Programlama'];
    const courseList = courseNames.map((name, index) => {
      const startHour = 9 + index;
      return new Course({
        CourseId: uuidv4(),
        Name: name,
        DayOfWeek: (index % 5) + 1, // Pazartesi = 1, Cuma = 5
        CourseCode: `CSE${100 + index}`,
        StartTime: new Date(2025, 0, 1, startHour, 0), // 09:00, 10:00, ...
        EndTime: new Date(2025, 0, 1, startHour + 1, 0),
      });
    });
    const courses = await Course.insertMany(courseList);
    console.log('5 kurs eklendi');

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
