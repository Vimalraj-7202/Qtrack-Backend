import "./src/config/config.js";
import app from "./app.js";
import ConnectDB from "./src/config/db.config.js";

const PORT = process.env.PORT || 5000;
ConnectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
