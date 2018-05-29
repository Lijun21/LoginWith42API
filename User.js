const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  studentID: String,
});

mongoose.model('users', userSchema);