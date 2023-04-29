const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Enable cross-origin resource sharing
app.use(cors());

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect('mongodb+srv://blackoffer:blackoffer123@cluster0.hqirbyj.mongodb.net/Blackoffer?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema for your data
const mySchema = new mongoose.Schema({
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
});

// Define model for your data
const myModel = mongoose.model('blackoffer', mySchema);

// Define API routes for your data
app.get('/blackoffer', async (req, res) => {
  try {
    const data = await myModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
