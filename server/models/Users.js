const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        }
    },
        googleId: {
        type: String,
        unique: true,
        sparse: true // allows multiple nulls
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports= mongoose.model('User', userSchema);