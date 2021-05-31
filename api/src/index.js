const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("./config/database");
require("dotenv-safe").config();

if (!process.env.JWT_SECRET) {
  console.error("FATAL ERROR: Key is not defined");
  process.exit(1);
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// routing
app.use("/api", require("./routes"));

app.listen(process.env.PORT, () => {
  console.log(`server started at http://localhost:${process.env.PORT}`);
});
