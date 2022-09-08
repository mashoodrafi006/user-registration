import Connection from './connection';
import ErrorMessage from "../constants/errorMessage";

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('trust proxy', 1); // trust first proxy

Connection.buildConnections();
ErrorMessage.setErrorMessages();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

module.exports = app;
