const express = require('express');

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');
const moment = require('moment');
const Videos = require('../dbase/models/videos');

require('dotenv').config();
const db_password = process.env.DB_PASSWORD;
const db_username = process.env.DB_USERNAME;

mongoose.connect(`mongodb+srv://${db_username}:${db_password}@figoh.qmta5.mongodb.net/FIGOH?retryWrites=true&w=majority`)

// *Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
app.use(bodyParser.json({ limit: '500mb', extended: true }));
app.use(express.static(path.join(__dirname, ('.././client/dist'))));
app.use('/videoUploads', express.static('videoUploads'));

//get list of arch videos
app.get('/archvid', (req, res) => {
  Videos.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err => console.log('error', err)))
})

app.post('/upload', (req, res) => {
  try {
    let currDate = moment().format('MMMM Do YYYY, h:mm:ss a');

    const { data } = req.body;
    const dataBuffer = new Buffer.from(data, 'base64');
    const fileStream = fs.createWriteStream(`videoUploads/${currDate}.webm`, { flags: 'a' });
    fileStream.write(dataBuffer)
    console.log('writing data...');

    fileStream.on('finish', () => {
      console.log('finished writing file');

      const video = new Videos({
        _id: new mongoose.Types.ObjectId(),
        name: currDate,
        path: `http://localhost:3000/videoUploads/${currDate}.webm`
      })
      video.save()
    })
    fileStream.end();
  } catch (error) {
    console.log(error);
    return res.send('ERROR', error);
  }
});

app.get('/count', (req, res) => {
  Videos.count({})
    .then((data) => {
      res.json(data);
    })
    .catch((err => console.log('error', err)));
})


module.exports = app;
