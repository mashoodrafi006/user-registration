import Connection from './connection';

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('trust proxy', 1); // trust first proxy

Connection.buildConnections();

module.exports = app;
