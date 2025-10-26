import { Schema, model, models } from 'mongoose';

const EventSchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  maxParticipants: { type: Number, default: 0, required: true },
  descriptionHtml: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

EventSchema.pre('save', function(next){ 
  this.updatedAt = new Date(); 
  next(); 
});

export default models.Event || model('Event', EventSchema);
