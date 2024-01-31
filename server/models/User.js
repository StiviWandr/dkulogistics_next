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
    
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    fathersName: {
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