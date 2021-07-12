const express = require('express');
const routes = require("./routes");
const app = express();

const connect = require("./schemas");
connect();

const port = 2000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const router = require('./routes');
app.use('/api/medicine', [router]);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});

module.exports = app;