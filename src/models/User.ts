import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true, index: true },
  emailVerified: { type: Date },
  image: { type: String },
  hashedPassword: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default models.User || model('User', UserSchema);
