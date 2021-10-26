const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const db = require("./models");

const productTypeRouter = require("./routers/productTypeRouter");
const productRouter = require("./routers/productRouter");

db.sequelize
  .sync()
  .then(() => {
    console.log(`🍀 Mysql DB Connection`);
  })
  .catch(console.error);

const PORT = process.env.PORT;
const app = express();

// Server Side Settings
app.set("trust proxy", 1);
app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    credentials: true,
  })
);

// Compare Dev - Prod
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combind"));
  app.use(helmet());
  app.use(hpp());
}

// Standard Server Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: true,
      // domain: "",
    },
  })
);

app.get("/", (req, res, next) => {
  return res.status(200).send("🍀 Express REST FULL API Server Called!");
});

app.use("/api/productType", productTypeRouter);
app.use("/api/product", productRouter);

app.listen(PORT, () => {
  console.log(`🍀 http://localhost:${PORT} Web Express Server Start`);
});
