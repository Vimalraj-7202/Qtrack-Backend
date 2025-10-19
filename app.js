import express from "express";
import cors from "cors";
import CommonRoutes from "./src/routes/commonRoute.js";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())
app.use("/qtrack", CommonRoutes);
app.get("/", (req, res) => {
  res.send("Backend server running sucessfully");
});

export default app;
