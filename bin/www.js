const { app } = require("../");
const syncDb = require("./sync-db");

syncDb().then(() => {
  console.log("Sync Database!");
  app.listen(3000, () => console.log("Server is Running"));
});
