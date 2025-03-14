const express = require('express')
const app = express()
const cors = require('cors');
const port = 5000

const sql = require('mssql')

app.use(cors());

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

app.get('/user', async (req, res) => {
  try {

    const {first_name, session_id, pseudo_id, date, timestamp} = req.query;

    if (!first_name) {
      return res.status(400).json({ message: "Missing first_name parameter" });
    }

    console.log(`API Request - First Name: ${first_name}, Session ID: ${session_id}, Pseudo ID: ${pseudo_id}, Date: ${date}, Time: ${timestamp}`);
    // Connect to the database
    await sql.connect(config);

    await sql.query`
      INSERT INTO API_Info (ga_psuedo, ga_session, user_name, date, timestamp)
      VALUES (${pseudo_id}, ${session_id},${first_name}, ${date}, ${timestamp})`;

    // Query the first user from the users table
    const result = await sql.query`
      SELECT first_name, last_name, money FROM Customers 
      WHERE first_name = ${first_name}`;

    console.log('Query Result:', result.recordset); // Log result to check the output

    // Check if a user was found
    if (result.recordset.length > 0) {
      res.json(result.recordset); // Return full user info
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
