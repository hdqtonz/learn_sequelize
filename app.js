const express = require("express");
const app = express();

const port = process.env.PORT || 8080;
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
app.get("/validation", userCtrl.validationCont);
app.get("/raw-query", userCtrl.reqQuery);
app.get("/one-to-one", userCtrl.oneToOne);
app.get("/one-to-many", userCtrl.oneToMany);
app.get("/belong-to", userCtrl.belongTo);
app.get("/many-to-many", userCtrl.manyToMany);
app.get("/scopes", userCtrl.scopes);
app.get("/polymorphic", userCtrl.polymorphic);
app.get("/polymorphic-many", userCtrl.polymorphicMany);
app.get("/loading", userCtrl.loading);
app.get("/paranoid", userCtrl.paranoid);
app.get("/restore", userCtrl.restoreData);
app.get("/delete-data", userCtrl.deleteData);
app.get("/transactions", userCtrl.transactions);
app.get("/hooks", userCtrl.hooks);
app.get("/query-interface", userCtrl.queryIntf);

app.listen(port, () => {
  console.log(`Server is runing on port${port}`);
});
