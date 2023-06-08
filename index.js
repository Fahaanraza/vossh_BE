const express = require('express');

const path = require('path');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');


const bodyParser = require('body-parser');

const initRoutes = require('./routes');

require('dotenv').config();

const app = express();
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    headers: {
      'Cross-Origin-Opener-Policy': 'unsafe-none',
    },
  })
);

app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
let db;
mongoose
  .connect(process.env.mongo_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    console.log('Initializing routes');
    initRoutes(app);

    const server = http.Server(app);

    server.listen(process.env.PORT, async () => {
      console.log(`Server running on: http://localhost:${process.env.PORT}`);

      try {
        console.log('Connected to MongoDB');
      } catch (err) {
        console.log(`Server startup failed: ${err}`);
      }
    });
  }).catch((err) => {
    console.log(`Failed to start server as connection to DB failed: ${err}`);
  });
