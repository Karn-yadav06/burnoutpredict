import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, default: '' },
  employees: { type: String, required: true },
  hrSoftware: { type: String, default: '' },
  industry: { type: String, default: '' },
  requirements: { type: String, default: '' }
}, { 
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const Contact = mongoose.model('Contact', contactSchema);
