import express from "express";
import userRoutes from "./routes/userRoutes.js";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(morgan("dev"))
app.get('/', (req, res) => {
res.send("hello world test");
});
app.use("/users", userRoutes);
const PORT = process.env.PORT || 8787;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});