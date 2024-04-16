const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const summaryGenerator = require('./gemini.js');

const app = express();
const port = process.env.PORT || '3000';

app.get('/', (req, res) => {
  res.json({ message: 'alive' });
});

// app.get('/summary', async (req, res) => {
//   const text = req.query?.text; // Assuming text is sent as a query parameter

//   if (!text) {
//     return res.status(400).json({ message: 'Text parameter is missing' });
//   }

//   console.log(`Text from frontend:`, text);

//   try {
//     // Generate summary from the provided text
//     const summary = await summaryGenerator.getSummaryFromText(text);
//     res.json({ summary });
//   } catch (error) {
//     res.status(500).json({ message: 'Error generating summary', error: error.message });
//   }
// });
app.get('/summary', async (req, res) => {
  const fileName = 'sample_contract.txt'; // File name

  try {
    // Construct the full path to the file
    const filePath = path.join(__dirname, fileName);

    // Read the content of the file
    const text = await fs.readFile(filePath, 'utf-8');
    

    // Generate summary from the content of the file
    const summary = await summaryGenerator.getSummary(text);
    res.json({ summary });
  } catch (error) {
    // Handle file read or summary generation errors
    res.status(500).json({ message: 'Error reading file or generating summary', error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
