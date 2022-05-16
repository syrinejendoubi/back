const mongoose = require("mongoose");
const ConnectDB = () => {
  mongoose
    .connect(
      "mongodb+srv://ReactProject:ReactProject@cluster0.aaffy.mongodb.net/Hicotech?retryWrites=true&w=majority"
    )
    .then(() => console.log("connected to mongoDB"))
    .catch((err) => {
      console.error(err);
    });
};
module.exports = ConnectDB;
