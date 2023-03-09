const PORT = 4000
const startServer = (app) => {
  app.listen(PORT, () => {
    console.log("Server up and running");
  });
};

module.exports = startServer