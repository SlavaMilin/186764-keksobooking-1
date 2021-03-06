'use strict';

const express = require(`express`);
const offersStore = require(`../offers/store`);
const imageStore = require(`../images/store`);
const offersRouter = require(`../offers/route`)(offersStore, imageStore);

const ServerSettings = {
  PORT: 3000,
  STATIC_FOLDER: `static`,
};

const app = express();
app.use(express.static(ServerSettings.STATIC_FOLDER));

app.use(`/api/offers`, offersRouter);

const startServer = (port) => {
  app.listen(port, () => console.log(`Сервер запущен: http://localhost:${port}`));
};


module.exports = {
  describe: `Стартует сервер на заданном порте. По умолчанию порт запуска - ${ServerSettings.PORT}`,
  name: `--server`,
  app,
  execute(port = ServerSettings.PORT) {
    startServer(port);
  },
};
