const User = require("../models/User.model");

module.exports = async (fastify, opts, done) => {
  fastify.get("/", async (req, res) => {
    const users = await User.find();
    res.send(users);
  });
};
