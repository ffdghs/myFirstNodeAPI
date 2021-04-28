import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import loadRoutes from './loadRoutes.js';

dotenv.config();

const { DATABASE_URL } = process.env;

const app = express();

loadRoutes(app);

mongoose.connect(
  DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err !== null) {
      console.error('An error happened during the database connection');
      console.error(err);

      process.exit(1);

    }

    console.log("Database connection successful");
  },
);

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('Successfuly connected');
// });



