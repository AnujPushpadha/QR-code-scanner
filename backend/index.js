import express from "express";
// import mysql from "mysql";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/dbConnection.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
connectDB();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mysql@619",
  database: "test",
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/contents", (req, res) => {
  //   res.send("hello");
  const q = "SELECT * FROM data_table  ";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/contents", (req, res) => {
  const q = "INSERT INTO data_table (`content`,`scan date`)VALUES (?)";
  //   const values = ["matlab kuch bhi", "2022-05-12"];
  // console.log(req.body);
  const values = [req.body.result, req.body.formattedDate];

  // const values = [req.body.content, req.body.scandate];
  // console.log(values);
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("success");
  });
});

app.delete("/contents/:id", (req, res) => {
  const id = req.params.id;
  const q = " DELETE FROM data_table WHERE id = ? ";

  db.query(q, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(8080, () => {
  console.log("connected to  backend!");
});
