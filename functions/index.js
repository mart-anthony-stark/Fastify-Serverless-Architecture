module.exports = async function (instance, opts, done) {
  instance.get("/", async (req, res) => {
    res.send({ hello: "world" });
  });

  instance.register(require("../routes/user.route"), { prefix: "/user" });
};
