const { Schema, model, ObjectId } = require("mongoose")


const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  diskSpace: { type: Number, default: 1024 ** 3 * 10 },
  events: { type: Object, required: true },
  avatar: { type: String },
  files: [{ type: ObjectId, ref: 'File' }]
})

module.exports = model('User', User)
