const express = require("express");
const routes = require("./routes");

function createApp() {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // routes
    // app.use(require("./routes"));

    app.use(routes);


    return app;
}

module.exports = createApp;
