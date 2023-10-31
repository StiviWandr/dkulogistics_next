import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    activationLink: {
        type: String
    },
    birthDay: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    vorname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: false
    },
    role: {
        type: String,
        values: ["user", "admin", "reviewer"],
        default: "user"
    },
})

const User = mongoose.model("User", UserSchema);

export default User;