const { User } = require("../../models");

const index = async (req, res) => {
  req.query.limits = req.query.limits || 10;
  const limit = parseInt(req.query.limits, 10); // req.query는 문자열로 들어오르모 int형으로 전환, 10은 10진법을 의미

  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }

  const users = await User.findAll({
    limit: limit,
  });
  return res.json(users);
};

const show = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  const user = await User.findOne({ where: { id } });

  if (user) {
    return res.json(user);
  } else {
    return res.status(404).end();
  }
};

const destory = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    res.status(400).end();
  }

  await User.destroy({ where: { id } });
  res.status(204).end();
};

const create = async (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).end();

  const user = await User.findOne({
    where: { name },
  });

  if (user) {
    return res.status(409).end();
  }

  const newUser = await User.create({ name });
  return res.json(newUser);
};

const update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if (!name) return res.status(400).end();

  User.findOne({ where: { id } }).then((user) => {
    if (!user) return res.status(404).end();

    user.name = name;
    user
      .save()
      .then(() => {
        res.json(user);
      })
      .catch((err) => {
        if (err.name === "SequelizeUniqueConstraintError") {
          return res.status(409).end();
        }
        res.status(500).end();
      });
  });
};

module.exports = {
  index,
  show,
  destory,
  create,
  update,
};
