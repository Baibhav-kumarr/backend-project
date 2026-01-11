import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";

app.use(cors(
   { origin : process.env.CORS_ORIGIN}
));
app.use(cookieParser());
app.use(express.json({ limit: "16kb" })); //matlab json ko accept kar raha hu
//with limit 16kb
//JSON sirf text data ke liye hota hai
//File (image, video, pdf) bahut badi hoti ha
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
//jab url se data ati hai 

//for public assets like images, videos, pdfs
app.use(express.static("public"));//public folder ka nam



export default app;