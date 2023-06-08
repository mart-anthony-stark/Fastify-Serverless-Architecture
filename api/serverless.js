require("dotenv").config({});
const mongoose = require("mongoose");
const Fastify = require("fastify");

const app = Fastify({ logger: false });

// Register your application as a normal plugin.
const functions = require("../functions");
app.register(functions, {
  prefix: "/",
});

let isConnected = false;

const connectToDatabase = async () => {
  if (!isConnected) {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
    });

    isConnected = true;
    console.log("Connected to the database...");
  }
};

module.exports = async (req, res) => {
  await app.register(require("@fastify/middie"), {
    hook: "onRequest", // default
  });
  await app.ready();
  await connectToDatabase();
  console.log("connected to database...");

  // Cross-Origin Request Configuration
  app.use(
    require("cors")({
      origin: process.env.CLIENT_URL || "*",
      credentials: true,
    })
  );
  app.server.emit("request", req, res);
};
