const mongoose = require('../db').mongoose;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
      },
    lastName: String,
    email: String,
    password: String,
    permissionLevel: Number,
    phone_no: String,
    date: Date,
});


const User = mongoose.model('Users', userSchema, 'users');


User.findByEmail = (email) => {
    return User.findOne({"email": email});
};
User.findByEmailAndRemove = (email) => {
    return User.findOneAndRemove({"email": email});
}


module.exports = User;