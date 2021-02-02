const express = require("express");
const { index, show, destory, create, update } = require("./user.ctrl");

const userRouter = express.Router();

userRouter.get("/", index);
userRouter.get("/:id", show);
userRouter.delete("/:id", destory);
userRouter.post("/", create);
userRouter.put("/:id", update);

module.exports = userRouter;
