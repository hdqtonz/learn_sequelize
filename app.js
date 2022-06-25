const express = require("express");
const app = express();

const port = 9000 || process.env.PORT;
require("./models");

app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(port, () => {
  console.log(`Server is runing on port${port}`);
});
