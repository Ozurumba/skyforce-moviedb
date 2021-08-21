import path from "path";
require("dotenv").config({ path: path.resolve(__dirname + "./.env")});
import express from "express";
import morgan from "morgan";
import cors from "cors";
import db from "./config/db";
import router from "./middleware/router";
import logger from "./config/error-log";


const port = process.env.PORT || 3200;

const app = express();

db();

app.use(express.static(path.join(__dirname, "/client/build")));

app.use(morgan("combined"));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.locals.role = null;
  next();
});

app.get( '/', ( req, res ) => {
  res.send({ message: "Welcome to Express API"})
  // res.sendFile( path.join( __dirname + '/client/build/index.html' ) );
} );

router(app);
logger();

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

export default app;