const express = require("express"); // it loads the express
const app = express(); //its intialize the express
const bodyParser = require("body-parser");
const cors = require("cors");
const { response } = require("express");
const apiRouter = require("./api/apiRouter");
const hostname = "127.0.0.1";
const port = 9000;

//configure body-parser
const jsonparser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
app.use(jsonparser);
app.use(urlEncodedParser);

//configure cors
app.use(cors());

//config routyer
app.use("/api", apiRouter);

//get
app.get("/", (require, response) => {
  response.send(`<h2>Welcome to
   express server of employee portal</h2>`);
});

app.listen(port, hostname, () => {
  console.log(`Express server is startedar http://${hostname}:${port}`);
});
