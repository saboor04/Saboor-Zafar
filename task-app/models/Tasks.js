var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  title: String,
  description: String
});

mongoose.model('Task', TaskSchema);
