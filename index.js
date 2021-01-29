const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));

let users = [
  { id: 1, name: "elice" },
  { id: 2, name: "bek" },
  { id: 3, name: "chris" },
];

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  const user = users.map((value) => {
    if (value.id === id) {
      return value;
    }
  })[0];

  if (user) {
    return res.json(user);
  } else {
    return res.status(404).end();
  }
});

app.get("/users", (req, res) => {
  req.query.limits = req.query.limits || 10;
  const limit = parseInt(req.query.limits, 10); // req.query는 문자열로 들어오르모 int형으로 전환, 10은 10진법을 의미

  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  return res.json(users.slice(0, limit));
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  console.log("id", id, "req.params", req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).end();
  }

  users = users.map((value) => {
    if (value.id !== id) {
      return value;
    }
  });

  console.log("users", users);

  res.status(204).end();
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

module.exports = { app };
