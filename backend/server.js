require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes/todos');
const PORT = process.env.PORT||8080;
const HOST = process.env.HOST||'localhost';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/todos', routes);

app.listen( PORT, HOST, () => {
    console.log(`app is alive on https://${HOST}:${PORT}`);
});