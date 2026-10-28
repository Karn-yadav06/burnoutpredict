import mongoose from 'mongoose';

const predictionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  employeeName: { type: String, required: true },
  department: { type: String, required: true },
  workloadLevel: { type: Number, required: true },
  weeklyHours: { type: Number, required: true },
  jobSatisfaction: { type: Number, required: true },
  remoteWork: { type: Boolean, required: true },
  sickDays: { type: Number, required: true },
  predictedScore: { type: Number, required: true },
  riskLevel: { type: String, required: true },
  recommendation: { type: String, required: true }
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

// Create a virtual property 'id' that maps to _id
predictionSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

export const Prediction = mongoose.model('Prediction', predictionSchema);
