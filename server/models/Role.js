import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: {type: String, required: true},
    permissions: {
        writeArticles: {
            default: false, 
            type: Boolean
        },
        readArticles: {
            default: true, 
            type: Boolean
        },
        adminPanel: {
            default: false,
            type: Boolean,
        }
    }
})

const Role = mongoose.model("Token", RoleSchema);

export default Role;