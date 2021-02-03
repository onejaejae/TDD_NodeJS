const e = require("express");
const should = require("should");
const request = require("supertest");
const { sequelize, User } = require("../../models");
const { app } = require("../../");

describe("GET /users는", () => {
  const users = [{ name: "alice" }, { name: "bek" }, { name: "chris" }];
  before(() => sequelize.sync({ force: true }));
  before(() => User.bulkCreate(users));

  describe("성공시", () => {
    it("유저 객체를 담은 배열로 응답한다", (done) => {
      request(app)
        .get("/users")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
    it("최대 limit 개수 만큼 응답한다", (done) => {
      request(app)
        .get("/users?limits=2")
        .end((err, res) => {
          res.body.should.have.length(2);
          done();
        });
    });
  });

  describe("실패시", () => {
    it("limit이 숫자형이 아닐 경우 400을 응답한다", (done) => {
      request(app).get("/users?limits=two").expect(400).end(done);
    });
  });
});

describe("GET /users/:id는", () => {
  const users = [{ name: "alice" }, { name: "bek" }, { name: "chris" }];
  before(() => sequelize.sync({ force: true }));
  before(() => User.bulkCreate(users));

  describe("성공시", () => {
    it("id가 1인 유저 객체를 반환한다", (done) => {
      request(app)
        .get("/users/1")
        .end((err, res) => {
          res.body.should.have.property("id", 1);
          done();
        });
    });
  });
  describe("실패 시", () => {
    it("id가 숫자가 아닐 경우 400으로 응답한다", (done) => {
      request(app).get("/users/one").expect(400).end(done);
    });

    it("id로 유저를 찾을 수 없을 경우 404로 응답한다", (done) => {
      request(app).get("/users/5").expect(404).end(done);
    });
  });
});

describe("DELETE /users/:id", () => {
  const users = [{ name: "alice" }, { name: "bek" }, { name: "chris" }];
  before(() => sequelize.sync({ force: true }));
  before(() => User.bulkCreate(users));

  describe("성공시", () => {
    it("204를 응답한다", (done) => {
      request(app).delete("/users/1").expect(204).end(done);
    });
  });
  describe("실패시", () => {
    it("id가 숫자가 아닐 경우 400을 응답한다", (done) => {
      request(app).delete("/users/one").expect(400).end(done);
    });
  });
});

describe("POST /users", () => {
  const users = [{ name: "alice" }, { name: "bek" }, { name: "chris" }];
  before(() => sequelize.sync({ force: true }));
  before(() => User.bulkCreate(users));

  describe("성공 시", () => {
    let name = "daniel";
    let body;
    before((done) => {
      request(app)
        .post("/users")
        .send({ name })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });

    it("생성된 유저 객체를 반환한다", () => {
      body.should.have.property("id");
    });

    it("입력한 name를 반환한다", () => {
      body.should.have.property("name", name);
    });
  });
  describe("실패 시", () => {
    it("name 파라미터 누락 시 400을 반환한다", (done) => {
      request(app).post("/users").send({}).expect(400).end(done);
    });

    it("name이 중복일 경우 409를 반환한다", (done) => {
      request(app).post("/users").send({ name: "chris" }).expect(409).end(done);
    });
  });
});

describe.only("PUT /users/:id", () => {
  const users = [{ name: "alice" }, { name: "bek" }, { name: "chris" }];
  before(() => sequelize.sync({ force: true }));
  before(() => User.bulkCreate(users));

  describe("성공 시", () => {
    it("변경된 name을 응답한다", (done) => {
      const name = "chally";
      request(app)
        .put("/users/3")
        .send({ name })
        .end((err, res) => {
          res.body.should.have.property("name", name);
          done();
        });
    });
  });

  describe("실패 시", () => {
    it("정수가 아닌 id를 응답할 경우 400을 응답한다", (done) => {
      request(app).put("/users/one").expect(400).end(done);
    });

    it("name이 없을 경우 400을 응답한다", (done) => {
      request(app).put("/users/1").send({}).expect(400).end(done);
    });

    it("없는 유저일 응답할 경우 404을 응답한다", (done) => {
      request(app).put("/users/999").send({ name: "jo" }).expect(404).end(done);
    });

    it("이름이 중복일 경우 409을 응답한다", (done) => {
      request(app).put("/users/3").send({ name: "bek" }).expect(400).end(done);
    });
  });
});
