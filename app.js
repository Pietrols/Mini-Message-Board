const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middleware
app.use(express.static(path.join(__dirname, "public")));

// parse form bodies into req.body
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", indexRouter);

// start server with a safe fallback if the port is in use
const DEFAULT_PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  server.on("error", (err) => {
    if (err && err.code === "EADDRINUSE") {
      console.error(`Port ${port} in use.`);
      // If we were trying the default port, try the next port once.
      if (port === 3000) {
        const alt = 3001;
        console.log(`Trying port ${alt} instead...`);
        startServer(alt);
      } else {
        console.error("Unable to start server: port in use.");
        process.exit(1);
      }
    } else {
      throw err;
    }
  });
}

startServer(DEFAULT_PORT);
