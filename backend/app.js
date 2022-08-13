const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./connection/connect");
const cors = require("cors");
const dataRouter = require("./routes/data");
dotenv.config();

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }))
app.use(cors());



const router = require("./routes/router");

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/", router);
app.use(dataRouter);

const startDB = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    const port = process.env.PORT || 3002;
    app.listen(port, () => {
      console.log(`server is running and listening to port - ${port}`);
      console.log("DB connected");
    });
  } catch (error) {
    console.log(error);
  }
};
startDB();
