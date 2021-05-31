const mongoose = require("mongoose");

async function connectToDatabase() {
  await mongoose
    .connect("mongodb://localhost:27017/finance", {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    })
    .then(() => console.log("Connected to database"))
    .catch((err) => console.error({ err }));
}

connectToDatabase();
