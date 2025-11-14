const express = require('express');
const mysql = require('mysql2');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;


const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Creoentidios1^', 
  database: 'company_db'
});

mysqlConnection.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL!');
});


mongoose.connect('mongodb://localhost/company_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('MongoDB connection error:', err));

const ProjectSchema = new mongoose.Schema({
  name: String,
  budget: Number
});

const Project = mongoose.model('Project', ProjectSchema);


app.get('/employees', (req, res) => {
  mysqlConnection.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching employees');
    } else {
      res.json(results);
    }
  });
});

app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching projects');
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
