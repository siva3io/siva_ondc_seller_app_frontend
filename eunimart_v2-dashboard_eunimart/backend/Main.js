const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 4032;
app.use(express.static(path.join(__dirname, "dist")));
app.get("/dashboard", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.get("/catalog", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.get("/createProduct", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log("server listening on port " + port);
});

