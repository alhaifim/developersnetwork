import { Mongoose } from "mongoose";

// we need to create a schema which holds different fields that we want this particular resource to have

//1. We bring Mongoose

const UserSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: Date,
    default: Date.now

});

module.exports = User = mongoose.module('user', UserSchema);