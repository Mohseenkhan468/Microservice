import express from "express";
import "dotenv/config";
import cors from 'cors'
import Routes from './routes/index.js'
import connectDB from "./config/db.config.js";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.get("/", (req, res) => {
  res.send("Hello");
});
connectDB(process.env.DATABASE_URL||'mongodb://localhost:27017/auth_micro_db')
app.use(Routes)
app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT} `);
});
