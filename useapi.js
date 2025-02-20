const express = require('express')
const app = express()
const port = 5000

const sql = require('mssql')

// Azure SQL connection configuration
const config = {
  user: 'SuperUser1',
  password: '9$tZMuJMGty9fDE',
  server: 'delhubandreal.database.windows.net',
  database: 'CapitalOne Database',
  options: {
    encrypt: true,  // Use encryption for security
    trustServerCertificate: false  // For production, use a valid certificate
  }
};

app.get('/first-user', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Query the first user from the users table
    const result = await sql.query('SELECT TOP 1 CONCAT(first_name,last_name) AS full_name FROM Customers'); // Adjust your query as needed

    console.log('Query Result:', result); // Log result to check the output

    // Check if a user was found
    if (result.recordset.length > 0) {
      // Send the first user's name as the response
      res.json({ firstUserName: result.recordset[0].full_name });
    } else {
      res.status(404).json({ message: 'No users found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving user', error: err.message });
  } finally {
    // Close the SQL connection
    sql.close();
  }
});

app.get('/hi', (req, res) => {
  res.send('Hello World!')
})

app.post("/test", (req, res) => {
    data.push(req.body);
    res.status(201).json({ message: "Item added", item: req.body });
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})