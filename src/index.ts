import express from "express";
import mongoose from "mongoose";
import { addUser, getTask, addTask } from "./controlers";

const app = express();

app.use(express.json());

app.post("/add-user", addUser);
app.get("/task", getTask);
app.post("/task", addTask);

mongoose.connect("mongodb://localhost/smarttodo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.listen(3000, () => {
  console.log("server listening at port 3000");
});
