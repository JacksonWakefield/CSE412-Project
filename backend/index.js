import express from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.get("/testy", (req, res) => {
    res.json("We here");
})

app.listen(8800, () =>{
    console.log("Connected");
})

