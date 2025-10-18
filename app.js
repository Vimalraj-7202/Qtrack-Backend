import express from "express";
import CommonRoutes from "./src/routes/commonRoute.js";
import cors from 'cors';
const app = express();
app.use(express.json());
app.use("/qtrack", CommonRoutes);
app.use(cors());
app.get("/", (req, res) => {
  res.send("Backend server running sucessfully");
});

export default app;
