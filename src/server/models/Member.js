const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name : { type: String, trim: true, uppercase: true, unique: true, required: true},
    age : { type: Number}
});

// courseSchema.statics.checkIfCourseExists = function (courseCode, cb) {
//     return this.find({ 
//         code : courseCode
//     }, cb);
// }

module.exports = mongoose.model("Members", memberSchema);