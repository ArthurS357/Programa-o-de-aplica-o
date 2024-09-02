import express from 'express';
const app = express();
const port = 3000;

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

//import express from "express";
//const app = express();
//app.use(express.json());
//console.log("Start Server At: 3000");
//app.listen(3000);