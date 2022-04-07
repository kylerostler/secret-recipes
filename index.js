require('dotenv').config()

const server = require('./api/server.js');

const PORT = process.env.PORT || 9000;

server.get("/", (req, res) => {
  res.send("Secret Recipes Hidden Here")
})

server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
