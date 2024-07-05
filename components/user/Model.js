
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {type: String},
    email: {type: String, required: true,unique: true},
    password: {type: String},
    image: {type: [String], required: true},
    role: {type: Number, default: 1},
    phonenumber: {type: String, default: "Chưa cập nhật"},
    address: {type: String, default: "Chưa cập nhật"},
});

module.exports = mongoose.models.user || mongoose.model('user', schema)
// product -----> products
/**
 * Database ----- Database
 * Table -------- Collection
 * Row ---------- Document
 * Column ------- Field
 */