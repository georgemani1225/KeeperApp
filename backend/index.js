import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import noteRoutes from './routes/note.route.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "frontend/build")));

app.use("/notes", noteRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});
