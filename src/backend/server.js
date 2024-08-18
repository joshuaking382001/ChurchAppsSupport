const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');
// const { readData, writeData, addUniqueId, updateData, deleteData } = require('./fileHandler.js');
const fs = require("fs");
const path = require("path");

app.use(cors());


// const app = express();
app.use(express.json()); // To parse JSON bodies

// GET request to read data
app.get('/api/data', (req, res) => {
  console.log("comming")
  const { fileName } = req.query;

  if (!fileName) {
    return res.status(400).json({ message: 'fileName is required' });
  }

  try {
    const data = readData(fileName);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error reading data' });
  }
});

// POST request to add new data
app.post('/api/data', (req, res) => {
  console.log("comming")
  const { fileName } = req.query;

  if (!fileName) {
    return res.status(400).json({ message: 'fileName is required' });
  }

  try {
    const newData = addUniqueId(req.body);
    const existingData = readData(fileName);
    existingData.push(newData);
    writeData(fileName, existingData);
    res.status(200).json({ message: 'Data added successfully', id: newData.id });
  } catch (error) {
    res.status(500).json({ message: 'Error adding data' });
  }
});

// PUT request to update existing data
app.put('/api/data', (req, res) => {
  const { fileName } = req.query;
  const { id, updates } = req.body;

  if (!fileName) {
    return res.status(400).json({ message: 'fileName is required' });
  }

  try {
    updateData(fileName, id, updates);
    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating data' });
  }
});

// DELETE request to delete data
app.delete('/api/data', (req, res) => {
  const { fileName } = req.query;
  const { id } = req.body;

  if (!fileName) {
    return res.status(400).json({ message: 'fileName is required' });
  }

  try {
    deleteData(fileName, id);
    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting data' });
  }
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// handler

// Generate unique ID with current date and time
const generateUniqueId = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `id-${year}${month}${day}-${hours}${minutes}${seconds}`;
};

const dataDirectory = path.join(process.cwd(), "data");

 const ensureDirectoryExists = () => {
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }
};

 const ensureFileExists = (fileName) => {
  ensureDirectoryExists();
  const filePath = path.join(dataDirectory, fileName);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  return filePath;
};

 const readData = (fileName) => {
  const filePath = ensureFileExists(fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
};

 const writeData = (fileName, data) => {
  const filePath = ensureFileExists(fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

 const addUniqueId = (data) => {
  data["id"] = generateUniqueId();
  return data;
};

 const updateData = (fileName, id, newData) => {
  console.log("Anitha",fileName,id)
  const data = readData(fileName);
  const updatedData = data.map((item) =>
    item.id === id ? { ...item, ...newData } : item
  );
  writeData(fileName, updatedData);
};

 const deleteData = (fileName, id) => {
  const data = readData(fileName);
  const filteredData = data.filter((item) => item.id !== id);
  writeData(fileName, filteredData);
};
