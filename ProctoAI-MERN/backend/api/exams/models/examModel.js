import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  name: String,
  description: String,
  examld: {
    type: String,
    required: true,
    unique: true,
  },
});

const examModel = mongoose.model('Exam', examSchema);

export default examModel;