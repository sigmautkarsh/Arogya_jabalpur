// const mongoose = require('mongoose');

// exports.connectDataBase = ()=>{
//     mongoose.connect(process.env.mongodblocal)
// }
const mongoose = require('mongoose');

exports.connectDataBase = () => {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(process.env.mongoURL1 || 'mongodb://127.0.0.1:27017/Ecommers', { useNewUrlParser: true })
    .then(() => console.log('connection successfull'));
}
