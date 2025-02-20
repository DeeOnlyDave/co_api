const express = require('express')
const app = express()
const port = 5000

app.get('/hi', (req, res) => {
  res.send('Hello World!')
})

app.post("/items", (req, res) => {
    data.push(req.body);
    res.status(201).json({ message: "Item added", item: req.body });
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
