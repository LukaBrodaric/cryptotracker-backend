import express, { application } from "express";
import cors from "cors";
import storage from "./memory.storage";
const app = express();
const port = 3000;
app.use(cors());
console.log(storage)

app.get("/posts", (req, res) => {
    res.json(storage);
});
app.listen(port, () => console.log(`Slušam aplikacijicu na portu ${port}!!!!`));