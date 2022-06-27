const express = require("express");
const app = express();

const port = 8080 || process.env.PORT;
require("./models");
const userCtrl = require("./controllers/userController");

// routes
app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/add", userCtrl.addUser);
app.get("/crud", userCtrl.crudOpretion);
app.get("/query", userCtrl.queryData);
app.get("/finder", userCtrl.finderData);
app.get("/setter-getter", userCtrl.setterGetter);

app.listen(port, () => {
  console.log(`Server is runing on port${port}`);
});
