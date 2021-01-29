const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));

const users = [
  { id: 1, name: "elice" },
  { id: 2, name: "bek" },
  { id: 3, name: "chris" },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
