import { Schema, model, models } from 'mongoose';

const ContactMessageSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default models.ContactMessage || model('ContactMessage', ContactMessageSchema);
