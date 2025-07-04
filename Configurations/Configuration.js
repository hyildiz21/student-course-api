  // configurations/Configuration.js
// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb+srv://voidsoftware:voidsoftware@studentclassprogram.0z7spp3.mongodb.net/test', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
// //     await mongoose.connect('mongodb+srv://voidsoftware:voidsoftware@studentclassprogram.0z7spp3.mongodb.net/test', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // });
//     console.log('MongoDB bağlantısı başarılı!');
//   } catch (error) {
//     console.error('MongoDB bağlantı hatası:', error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL || 'mongodb+srv://voidsoftware:voidsoftware@studentclassprogram.0z7spp3.mongodb.net/test';
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB bağlantısı başarılı!');
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
