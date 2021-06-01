const mongoose = require("mongoose");

async function connectToDatabase() {
  await mongoose
    .connect("mongodb+srv://admin:admin@cluster0.gc0rs.mongodb.net/finances?retryWrites=true&w=majority", {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    })
    .then(() => console.log("Connected to database"))
    .catch((err) => console.error({ err }));
}

connectToDatabase();
