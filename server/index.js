const express = require("express");
require("dotenv").config();
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://photo-app-client.vercel.app",
  })
);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("<h1>it is working</h1>");
});

app.use("/users", require("./controllers/userControllers"));
app.use("/posts", require("./controllers/postControllers"));
app.use(require("./middleware/errorHandler"));
